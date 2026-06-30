import { Response } from "express";
import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase";
import { signToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../middleware/auth";

// Initial setup to create the first Super Admin if no users exist
export const setup = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Check if any user exists
    const { count, error: countError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (countError) {
      return res.status(500).json({
        success: false,
        message: "Database query error.",
        error: countError,
      });
    }

    if (count && count > 0) {
      return res.status(400).json({
        success: false,
        message: "Setup has already been completed. Admin users exist.",
      });
    }

    const { username, password, fullname } = req.body;
    if (!username || !password || !fullname) {
      return res.status(400).json({
        success: false,
        message: "Username, password, and fullname are required.",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert Super Admin
    const { data, error: insertError } = await supabase
      .from("users")
      .insert({
        username,
        password_hash,
        fullname,
        role: "Super Admin",
        status: "Active",
      })
      .select("id, username, fullname, role, status")
      .single();

    if (insertError) {
      return res.status(500).json({
        success: false,
        message: "Failed to create Super Admin.",
        error: insertError,
      });
    }

    // Log action in audit logs
    await supabase.from("audit_logs").insert({
      username: username,
      action: "SETUP_COMPLETED",
      details: `Super Admin account created: ${username}`,
      ip_address: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: "Super Admin account created successfully.",
      user: data,
    });
  } catch (err) {
    console.error("Setup error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin user login
export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    // Fetch user
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .maybeSingle();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Database error.",
        error,
      });
    }

    if (!user) {
      // Log failed login
      await supabase.from("audit_logs").insert({
        username,
        action: "LOGIN_FAILED",
        details: "User not found",
        ip_address: req.ip,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    if (user.status === "Suspended") {
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        username,
        action: "LOGIN_FAILED",
        details: "Account suspended",
        ip_address: req.ip,
      });

      return res.status(403).json({
        success: false,
        message: "Your account has been suspended. Please contact the Super Admin.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      // Log failed login
      await supabase.from("audit_logs").insert({
        user_id: user.id,
        username,
        action: "LOGIN_FAILED",
        details: "Incorrect password",
        ip_address: req.ip,
      });

      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    // Update last login
    const now = new Date().toISOString();
    await supabase
      .from("users")
      .update({ last_login: now })
      .eq("id", user.id);

    // Generate JWT
    const token = signToken({
      id: user.id,
      username: user.username,
      role: user.role,
      fullname: user.fullname,
    });

    // Log successful login
    await supabase.from("audit_logs").insert({
      user_id: user.id,
      username,
      action: "LOGIN_SUCCESS",
      details: `Successful login. Role: ${user.role}`,
      ip_address: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        role: user.role,
        status: user.status,
        last_login: now,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Get current authenticated user
export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated.",
    });
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, fullname, role, status, last_login, created_at")
      .eq("id", req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
