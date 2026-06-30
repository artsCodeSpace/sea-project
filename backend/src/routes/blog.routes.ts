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

router.use(authenticateJWT);
router.use(requireRole(["Super Admin", "Administrator", "Editor"]));

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
