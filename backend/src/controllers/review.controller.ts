import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../config/supabase";

export const createReview = async (
  req: Request,
  res: Response
) => {
  try {
    const { fullname, role, review } = req.body;

    if (!fullname || !role || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required.",
      });
    }

    const extension = req.file.originalname.split(".").pop();

    const filename = `${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("review-images")
      .upload(filename, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (uploadError) {
      return res.status(500).json(uploadError);
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("review-images")
      .getPublicUrl(filename);

    const { error: dbError } = await supabase
      .from("review")
      .insert({
        fullname,
        role,
        review,
        image_url: publicUrl,
      });

    if (dbError) {
      return res.status(500).json(dbError);
    }

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};