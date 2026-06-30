import { Response } from "express";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Get aggregate stats for dashboard cards
export const getStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Run counts in parallel
    const [
      { count: totalUsers },
      { count: activeAdmins },
      { count: publishedBlogs },
      { count: draftBlogs },
      { count: pendingReviews },
      { count: approvedReviews },
      { count: totalContacts },
      { count: openContacts },
    ] = await Promise.all([
      supabase.from("users").select("*", { count: "exact", head: true }),
      supabase.from("users").select("*", { count: "exact", head: true }).eq("status", "Active").in("role", ["Super Admin", "Administrator"]),
      supabase.from("blog").select("*", { count: "exact", head: true }).eq("status", "Published"),
      supabase.from("blog").select("*", { count: "exact", head: true }).eq("status", "Draft"),
      supabase.from("review").select("*", { count: "exact", head: true }).eq("status", "Pending"),
      supabase.from("review").select("*", { count: "exact", head: true }).eq("status", "Approved"),
      supabase.from("contact_inquiries").select("*", { count: "exact", head: true }),
      supabase.from("contact_inquiries").select("*", { count: "exact", head: true }).eq("status", "Open"),
    ]);

    // Return stats (website visitors are simulated since we don't have a tracking script)
    return res.status(200).json({
      success: true,
      stats: {
        totalUsers: totalUsers || 0,
        activeAdmins: activeAdmins || 0,
        publishedBlogs: publishedBlogs || 0,
        draftBlogs: draftBlogs || 0,
        pendingReviews: pendingReviews || 0,
        approvedReviews: approvedReviews || 0,
        totalContacts: totalContacts || 0,
        openContacts: openContacts || 0,
        websiteVisitors: 14250,
        totalPageViews: 45890,
      },
    });
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get chart data & recent activity widgets
export const getDashboardData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Fetch recent records for widgets
    const [
      { data: recentReviews },
      { data: recentUsers },
      { data: recentBlogs },
      { data: recentLogins },
      { data: recentContacts },
    ] = await Promise.all([
      supabase.from("review").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("users").select("id, username, fullname, role, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("blog").select("id, title, category, author, status, created_at").order("created_at", { ascending: false }).limit(5),
      supabase.from("audit_logs").select("*").eq("action", "LOGIN_SUCCESS").order("created_at", { ascending: false }).limit(5),
      supabase.from("contact_inquiries").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    // 2. Compile simulated analytics charts data (custom-designed for Seatown)
    const monthlyUsers = [
      { month: "Jan", count: 4 },
      { month: "Feb", count: 7 },
      { month: "Mar", count: 12 },
      { month: "Apr", count: 18 },
      { month: "May", count: 24 },
      { month: "Jun", count: 32 },
    ];

    const monthlyReviews = [
      { month: "Jan", approved: 15, pending: 2 },
      { month: "Feb", approved: 22, pending: 4 },
      { month: "Mar", approved: 35, pending: 7 },
      { month: "Apr", approved: 48, pending: 5 },
      { month: "May", approved: 72, pending: 11 },
      { month: "Jun", approved: 94, pending: 12 },
    ];

    const websiteTraffic = [
      { day: "Mon", visitors: 320, pageViews: 980 },
      { day: "Tue", visitors: 410, pageViews: 1240 },
      { day: "Wed", visitors: 380, pageViews: 1150 },
      { day: "Thu", visitors: 450, pageViews: 1400 },
      { day: "Fri", visitors: 490, pageViews: 1620 },
      { day: "Sat", visitors: 280, pageViews: 850 },
      { day: "Sun", visitors: 210, pageViews: 620 },
    ];

    const blogGrowth = [
      { month: "Jan", total: 0 },
      { month: "Feb", total: 2 },
      { month: "Mar", total: 3 },
      { month: "Apr", total: 5 },
      { month: "May", total: 5 },
      { month: "Jun", total: 6 },
    ];

    const visitorAnalytics = {
      devices: [
        { name: "Desktop", percentage: 68 },
        { name: "Mobile", percentage: 25 },
        { name: "Tablet", percentage: 7 },
      ],
      browsers: [
        { name: "Chrome", percentage: 55 },
        { name: "Safari", percentage: 22 },
        { name: "Firefox", percentage: 12 },
        { name: "Edge", percentage: 11 },
      ],
      countries: [
        { name: "India", count: 5200 },
        { name: "Singapore", count: 3400 },
        { name: "United Kingdom", count: 2100 },
        { name: "United Arab Emirates", count: 1800 },
        { name: "United States", count: 1750 },
      ],
      sources: [
        { name: "Direct", percentage: 40 },
        { name: "Organic Search", percentage: 35 },
        { name: "Referrals", percentage: 15 },
        { name: "Social Media", percentage: 10 },
      ],
    };

    return res.status(200).json({
      success: true,
      widgets: {
        recentReviews: recentReviews || [],
        recentUsers: recentUsers || [],
        recentBlogs: recentBlogs || [],
        recentLogins: recentLogins || [],
        recentContacts: recentContacts || [],
      },
      charts: {
        monthlyUsers,
        monthlyReviews,
        websiteTraffic,
        blogGrowth,
        visitorAnalytics,
      },
    });
  } catch (err) {
    console.error("getDashboardData error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get audit logs (Super Admin and Administrator only)
export const getAuditLogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page = "1", limit = "20" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    const { data: logs, count, error } = await supabase
      .from("audit_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch audit logs.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      logs,
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error("getAuditLogs error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
