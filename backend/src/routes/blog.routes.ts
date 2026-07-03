import express from "express";
import {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

// ---------- PUBLIC ----------
router.get("/", getBlogs);
router.get("/:id", getBlogById);

// ---------- ADMIN ----------
router.post(
  "/",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor"]),
  createBlog
);

router.put(
  "/:id",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor"]),
  updateBlog
);

router.delete(
  "/:id",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor"]),
  deleteBlog
);

export default router;
