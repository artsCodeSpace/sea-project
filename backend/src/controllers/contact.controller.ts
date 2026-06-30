import { Response } from "express";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Get all contact inquiries
export const getContacts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, search, page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from("contact_inquiries")
      .select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`);
    }

    const { data: contacts, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contact inquiries.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      contacts,
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error("getContacts error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update inquiry (status and/or reply notes)
export const updateContact = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reply_notes } = req.body;

    const { data: currentInquiry } = await supabase
      .from("contact_inquiries")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!currentInquiry) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found.",
      });
    }

    const updates: any = {};
    if (status !== undefined) {
      if (!["Open", "In Progress", "Resolved", "Archived"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'Open', 'In Progress', 'Resolved', or 'Archived'.",
        });
      }
      updates.status = status;
    }
    if (reply_notes !== undefined) updates.reply_notes = reply_notes;
    updates.updated_at = new Date().toISOString();

    const { data: updatedInquiry, error } = await supabase
      .from("contact_inquiries")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update contact inquiry.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "CONTACT_UPDATE",
      details: `Updated contact inquiry from "${updatedInquiry.name}". Status: ${updatedInquiry.status}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Contact inquiry updated successfully.",
      contact: updatedInquiry,
    });
  } catch (err) {
    console.error("updateContact error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete inquiry
export const deleteContact = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: inquiryToDelete } = await supabase
      .from("contact_inquiries")
      .select("name")
      .eq("id", id)
      .single();

    if (!inquiryToDelete) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found.",
      });
    }

    const { error } = await supabase
      .from("contact_inquiries")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete contact inquiry.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "CONTACT_DELETE",
      details: `Deleted contact inquiry from: "${inquiryToDelete.name}"`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Contact inquiry deleted successfully.",
    });
  } catch (err) {
    console.error("deleteContact error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
