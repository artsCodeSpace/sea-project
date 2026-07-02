import { Response } from "express";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Helper to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove all non-word chars
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with single hyphen
    .replace(/^-+|-+$/g, ""); // Trim hyphens from ends
};

// Helper to calculate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Get all blogs (Admin view: can see draft, scheduled, published)
export const getBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, category, status, page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from("blog")
      .select("*", { count: "exact" });

    if (category) {
      query = query.eq("category", category);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    }

    const { data: blogs, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch blogs.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error("getBlogs error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get single blog post
export const getBlogById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: blog, error } = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
        error,
      });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    console.error("getBlogById error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Create blog post
export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      category,
      excerpt,
      content,
      featured_image,
      status = "Draft",
      published_at,
      featured = false,
      seo_title,
      seo_description,
      tags = [],
    } = req.body;

    if (!title || !category || !excerpt || !content) {
      return res.status(400).json({
        success: false,
        message: "Title, category, excerpt, and content are required.",
      });
    }

    const slug = req.body.slug ? generateSlug(req.body.slug) : generateSlug(title);

    // Check if slug is unique
    const { data: existingSlug } = await supabase
      .from("blog")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "A blog post with this title or slug already exists.",
      });
    }

    const reading_time = calculateReadingTime(content);
    const author = req.user?.fullname || "Seatown Admin";
    const author_avatar = req.user?.fullname ? req.user.fullname.split(" ").map(n => n[0]).join("") : "SA";

    const publishedDate = status === "Published" ? new Date().toISOString() : (status === "Scheduled" ? published_at : null);

    const { data: newBlog, error } = await supabase
      .from("blog")
      .insert({
        title,
        slug,
        category,
        excerpt,
        content,
        featured_image,
        author,
        author_avatar,
        status,
        published_at: publishedDate,
        reading_time,
        featured,
        seo_title: seo_title || title,
        seo_description: seo_description || excerpt,
        tags,
      })
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create blog post.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "BLOG_CREATE",
      details: `Created blog post: "${title}" in status ${status}`,
      ip_address: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "Blog post created successfully.",
      blog: newBlog,
    });
  } catch (err) {
    console.error("createBlog error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update blog post
export const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug: customSlug,
      category,
      excerpt,
      content,
      featured_image,
      status,
      published_at,
      featured,
      seo_title,
      seo_description,
      tags,
    } = req.body;

    // Get current blog to verify
    const { data: currentBlog } = await supabase
      .from("blog")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!currentBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (category !== undefined) updates.category = category;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (content !== undefined) {
      updates.content = content;
      updates.reading_time = calculateReadingTime(content);
    }
    if (featured_image !== undefined) updates.featured_image = featured_image;
    if (featured !== undefined) updates.featured = featured;
    if (seo_title !== undefined) updates.seo_title = seo_title;
    if (seo_description !== undefined) updates.seo_description = seo_description;
    if (tags !== undefined) updates.tags = tags;

    // Handle slug update
    if (customSlug !== undefined && customSlug !== currentBlog.slug) {
      updates.slug = generateSlug(customSlug);
    } else if (title !== undefined && title !== currentBlog.title && !customSlug) {
      updates.slug = generateSlug(title);
    }

    // Check slug uniqueness if changed
    if (updates.slug && updates.slug !== currentBlog.slug) {
      const { data: existingSlug } = await supabase
        .from("blog")
        .select("id")
        .eq("slug", updates.slug)
        .maybeSingle();

      if (existingSlug) {
        return res.status(400).json({
          success: false,
          message: "A blog post with this title or slug already exists.",
        });
      }
    }

    // Handle status changes
    if (status !== undefined && status !== currentBlog.status) {
      updates.status = status;
      if (status === "Published") {
        updates.published_at = new Date().toISOString();
      } else if (status === "Scheduled") {
        updates.published_at = published_at;
      } else {
        updates.published_at = null;
      }
    } else if (status === "Scheduled" && published_at !== undefined) {
      updates.published_at = published_at;
    }

    updates.updated_at = new Date().toISOString();

    const { data: updatedBlog, error } = await supabase
      .from("blog")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update blog post.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "BLOG_UPDATE",
      details: `Updated blog post: "${updatedBlog.title}"`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Blog post updated successfully.",
      blog: updatedBlog,
    });
  } catch (err) {
    console.error("updateBlog error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete blog post
export const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Get title before deleting
    const { data: blogToDelete } = await supabase
      .from("blog")
      .select("title")
      .eq("id", id)
      .single();

    if (!blogToDelete) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    const { error } = await supabase
      .from("blog")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete blog post.",
        error,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "BLOG_DELETE",
      details: `Deleted blog post: "${blogToDelete.title}"`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Blog post deleted successfully.",
    });
  } catch (err) {
    console.error("deleteBlog error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

   // Get all published blogs for public view
export const getPublicBlogBySlug = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { slug } = req.params;

    const { data: blog, error } = await supabase
      .from("blog")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Published")
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
