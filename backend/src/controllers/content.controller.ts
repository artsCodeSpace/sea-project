import { Response } from "express";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Get content by key
export const getContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;

    const { data, error } = await supabase
      .from("website_content")
      .select("*")
      .eq("key", key)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
        error,
      });
    }

    if (!data) {
      return res.status(200).json({
        success: true,
        content: null,
      });
    }

    return res.status(200).json({
      success: true,
      content: data.value,
    });
  } catch (err) {
    console.error("getContent error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update content by key
export const updateContent = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    if (value === undefined) {
      return res.status(400).json({
        success: false,
        message: "Value is required.",
      });
    }

    const { data, error } = await supabase
      .from("website_content")
      .upsert({
        key,
        value,
        updated_at: new Date().toISOString(),
      })
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update website content.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "CONTENT_UPDATE",
      details: `Updated website content key: "${key}"`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: `Website content for "${key}" updated successfully.`,
      content: data.value,
    });
  } catch (err) {
    console.error("updateContent error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
