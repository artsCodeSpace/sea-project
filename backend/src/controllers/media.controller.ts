import { Response } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// List all media files
export const getMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { data, error } = await supabase.storage
      .from("media")
      .list("", {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      // If the bucket doesn't exist, try to create it or return empty
      if (error.message.includes("not found")) {
        return res.status(200).json({
          success: true,
          media: [],
          message: "Media bucket not found. Please create a bucket named 'media' in the Supabase storage dashboard.",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Failed to list media files.",
        error,
      });
    }

    // Generate public URLs for each file
    const media = data.map((file) => {
      const {
        data: { publicUrl },
      } = supabase.storage.from("media").getPublicUrl(file.name);

      return {
        name: file.name,
        id: file.id,
        size: file.metadata?.size || 0,
        mimeType: file.metadata?.mimetype || "image/jpeg",
        createdAt: file.created_at,
        url: publicUrl,
      };
    });

    return res.status(200).json({
      success: true,
      media,
    });
  } catch (err) {
    console.error("getMedia error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Upload media file
export const uploadMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const extension = req.file.originalname.split(".").pop();
    const filename = `${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload file to storage.",
        error: uploadError,
      });
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("media").getPublicUrl(filename);

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "MEDIA_UPLOAD",
      details: `Uploaded media file: ${filename} (${req.file.originalname})`,
      ip_address: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      file: {
        name: filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        url: publicUrl,
      },
    });
  } catch (err) {
    console.error("uploadMedia error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete media file
export const deleteMedia = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ success: false, message: "File name is required." });
    }

    const { data, error } = await supabase.storage
      .from("media")
      .remove([name]);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete media file.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "MEDIA_DELETE",
      details: `Deleted media file: ${name}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Media file deleted successfully.",
      data,
    });
  } catch (err) {
    console.error("deleteMedia error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
