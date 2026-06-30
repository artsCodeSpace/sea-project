import express from "express";
import { supabase } from "../config/supabase";
import { upload } from "../middleware/upload";
import { createReview } from "../controllers/review.controller";

const router = express.Router();

// 1. Get published blog posts
router.get("/blogs", async (req, res) => {
  try {
    const { category, limit = "10" } = req.query;
    const limitNum = parseInt(limit as string, 10);

    let query = supabase
      .from("blog")
      .select("*")
      .eq("status", "Published");

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data: blogs, error } = await query
      .order("published_at", { ascending: false })
      .limit(limitNum);

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    return res.status(200).json({ success: true, blogs });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// 2. Get single published blog post by slug
router.get("/blogs/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const { data: blog, error } = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Published")
      .maybeSingle();

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog post not found" });
    }

    return res.status(200).json({ success: true, blog });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// 3. Get approved reviews
router.get("/reviews", async (req, res) => {
  try {
    const { data: reviews, error } = await supabase
      .from("review")
      .select("*")
      .eq("status", "Approved")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    return res.status(200).json({ success: true, reviews });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// 3b. Submit a new review (public, handled by createReview controller with photo upload)
router.post("/reviews", upload.single("photo"), createReview);

// 4. Get all website content CMS keys
router.get("/content", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("website_content")
      .select("*");

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    // Convert list to key-value object
    const content: Record<string, any> = {};
    data?.forEach((item) => {
      content[item.key] = item.value;
    });

    return res.status(200).json({ success: true, content });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// 5. Submit contact inquiry
router.post("/contacts", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const { data: inquiry, error } = await supabase
      .from("contact_inquiries")
      .insert({
        name,
        email,
        phone,
        service: service || "General",
        message,
        status: "Open",
      })
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      inquiry,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
