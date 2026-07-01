import { Request, Response } from "express";
import { randomUUID } from "crypto";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Public submission of review (multipart form upload)
export const createReview = async (req: Request, res: Response) => {
  try {
    const { fullname, role, review } = req.body;

    if (!fullname || !role || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    let publicUrl = null;

    if (req.file) {
      const extension = req.file.originalname.split(".").pop();
      const filename = `${randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("review-images")
        .upload(filename, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (uploadError) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload image.",
          error: uploadError,
        });
      }

      const {
        data: { publicUrl: url },
      } = supabase.storage
        .from("review-images")
        .getPublicUrl(filename);

      publicUrl = url;
    }

    const { error: dbError } = await supabase
      .from("review")
      .insert({
        fullname,
        role,
        review,
        image_url: publicUrl,
        status: "Pending", // Default is pending moderation
      });

    if (dbError) {
      return res.status(500).json({
        success: false,
        message: "Failed to insert review into database.",
        error: dbError,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully and is pending moderation.",
    });

  } catch (err) {
    console.error("createReview error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin list reviews (requires JWT & moderation role)
export const getReviews = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, search, page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from("review")
      .select("*", { count: "exact" });

    if (status) {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(`fullname.ilike.%${search}%,review.ilike.%${search}%`);
    }

    const { data: reviews, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch reviews.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      reviews,
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error("getReviews error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//fetch reviews from dashboard to homepage
export const getApprovedReviews = async (
  req: Request,
  res: Response
) => {
  try{
    const { data, error } = await supabase
      .from("review")
      .select("*")
      .eq("status", "Approved")
      .order("created_at", {ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch reviews",
      });
    }

    return res.json({
      success: true,
      reviews: data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Admin update review (requires JWT & moderation role)
export const updateReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { fullname, role, review, status, image_url } = req.body;

    const { data: currentReview } = await supabase
      .from("review")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!currentReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const updates: any = {};
    if (fullname !== undefined) updates.fullname = fullname;
    if (role !== undefined) updates.role = role;
    if (review !== undefined) updates.review = review;
    if (status !== undefined) updates.status = status;
    if (image_url !== undefined) updates.image_url = image_url;

    const { data: updatedReview, error } = await supabase
      .from("review")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update review.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "REVIEW_UPDATE",
      details: `Updated review for "${updatedReview.fullname}". Status: ${updatedReview.status}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review: updatedReview,
    });
  } catch (err) {
    console.error("updateReview error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin delete review (requires JWT & moderation role - Super Admin / Admin / Editor / Moderator)
export const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: reviewToDelete } = await supabase
      .from("review")
      .select("fullname")
      .eq("id", id)
      .single();

    if (!reviewToDelete) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const { error } = await supabase
      .from("review")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete review.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "REVIEW_DELETE",
      details: `Deleted review submitted by: "${reviewToDelete.fullname}"`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    console.error("deleteReview error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin bulk actions (requires JWT & moderation role)
export const bulkAction = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { ids, action } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "An array of review IDs is required.",
      });
    }

    if (!["Approve", "Reject", "Delete", "Spam"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Invalid action. Must be 'Approve', 'Reject', 'Delete', or 'Spam'.",
      });
    }

    if (action === "Delete") {
      // Deleting multiple reviews
      const { error } = await supabase
        .from("review")
        .delete()
        .in("id", ids);

      if (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to bulk delete reviews.",
          error,
        });
      }

      // Log action in audit logs
      await supabase.from("audit_logs").insert({
        user_id: req.user?.id,
        username: req.user?.username || "System",
        action: "REVIEW_BULK_DELETE",
        details: `Bulk deleted ${ids.length} reviews.`,
        ip_address: req.ip,
      });

      return res.status(200).json({
        success: true,
        message: `Successfully deleted ${ids.length} reviews.`,
      });
    } else {
      // Updating status (Approved, Rejected, Spam)
      const targetStatus = action === "Approve" ? "Approved" : (action === "Reject" ? "Rejected" : "Spam");

      const { error } = await supabase
        .from("review")
        .update({ status: targetStatus })
        .in("id", ids);

      if (error) {
        return res.status(500).json({
          success: false,
          message: `Failed to bulk ${action.toLowerCase()} reviews.`,
          error,
        });
      }

      // Log action in audit logs
      await supabase.from("audit_logs").insert({
        user_id: req.user?.id,
        username: req.user?.username || "System",
        action: `REVIEW_BULK_${action.toUpperCase()}`,
        details: `Bulk updated ${ids.length} reviews to status: ${targetStatus}`,
        ip_address: req.ip,
      });

      return res.status(200).json({
        success: true,
        message: `Successfully updated ${ids.length} reviews to status: ${targetStatus}.`,
      });
    }
  } catch (err) {
    console.error("bulkAction error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};