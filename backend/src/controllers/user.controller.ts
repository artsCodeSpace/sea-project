import { Response } from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase";
import { AuthenticatedRequest } from "../middleware/auth";

// Get all users (Super Admin only)
export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, role, status, page = "1", limit = "10" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from("users")
      .select("id, username, fullname, role, status, last_login, created_at", { count: "exact" });

    // Apply filters
    if (role) {
      query = query.eq("role", role);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (search) {
      query = query.or(`username.ilike.%${search}%,fullname.ilike.%${search}%`);
    }

    // Apply pagination
    const { data: users, count, error } = await query
      .order("created_at", { ascending: false })
      .range(offset, offset + limitNum - 1);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch users.",
        error,
      });
    }

    return res.status(200).json({
      success: true,
      users,
      pagination: {
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil((count || 0) / limitNum),
      },
    });
  } catch (err) {
    console.error("getUsers error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Create user (Super Admin only)
export const createUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, password, fullname, role } = req.body;

    if (!username || !password || !fullname || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (username, password, fullname, role).",
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username is already taken.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        username,
        password_hash,
        fullname,
        role,
        status: "Active",
      })
      .select("id, username, fullname, role, status, created_at")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user.",
        error,
      });
    }

    // Log in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "USER_CREATE",
      details: `Created user ${username} with role ${role}`,
      ip_address: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: newUser,
    });
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update user details (Super Admin only)
export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { fullname, role } = req.body;

    if (!fullname || !role) {
      return res.status(400).json({
        success: false,
        message: "Fullname and role are required.",
      });
    }

    // Update user
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ fullname, role })
      .eq("id", id)
      .select("id, username, fullname, role, status")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update user.",
        error,
      });
    }

    // Log in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "USER_UPDATE",
      details: `Updated user ${updatedUser.username}. Role: ${role}, Name: ${fullname}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateUser error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update user status (Suspend/Activate) - (Super Admin only)
export const updateStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (status !== "Active" && status !== "Suspended") {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Active' or 'Suspended'.",
      });
    }

    if (id === req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot suspend your own account.",
      });
    }

    // Update status
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ status })
      .eq("id", id)
      .select("id, username, status")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update user status.",
        error,
      });
    }

    // Log in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: status === "Suspended" ? "USER_SUSPEND" : "USER_ACTIVATE",
      details: `${status === "Suspended" ? "Suspended" : "Activated"} user ${updatedUser.username}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: `User status updated to ${status} successfully.`,
      user: updatedUser,
    });
  } catch (err) {
    console.error("updateStatus error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Reset password (Super Admin only)
export const resetPassword = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password is required and must be at least 4 characters.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Update password
    const { data: updatedUser, error } = await supabase
      .from("users")
      .update({ password_hash })
      .eq("id", id)
      .select("id, username")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to reset password.",
        error,
      });
    }

    // Log in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "USER_PASSWORD_RESET",
      details: `Reset password for user ${updatedUser.username}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: `Password for ${updatedUser.username} has been reset successfully.`,
    });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Delete user (Super Admin only)
export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (id === req.user?.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account.",
      });
    }

    // Get username before delete for audit logging
    const { data: userToDelete } = await supabase
      .from("users")
      .select("username")
      .eq("id", id)
      .single();

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Delete user
    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete user.",
        error,
      });
    }

    // Log in audit logs
    await supabase.from("audit_logs").insert({
      user_id: req.user?.id,
      username: req.user?.username || "System",
      action: "USER_DELETE",
      details: `Deleted user account: ${userToDelete.username}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
