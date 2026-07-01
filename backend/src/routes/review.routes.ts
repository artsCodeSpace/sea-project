import express from "express";
import { upload } from "../middleware/upload";
import {
  createReview,
  getReviews,
  getApprovedReviews,
  updateReview,
  deleteReview,
  bulkAction,
} from "../controllers/review.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

// Public route for submitting testimonials
router.post("/", upload.single("photo"), createReview);
router.get("/", getApprovedReviews);

// Admin routes (require JWT and appropriate role)
router.get(
  "/admin",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor", "Moderator"]),
  getReviews
);

router.put(
  "/:id",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor", "Moderator"]),
  updateReview
);

router.delete(
  "/:id",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor"]),
  deleteReview
);

router.post(
  "/bulk",
  authenticateJWT,
  requireRole(["Super Admin", "Administrator", "Editor", "Moderator"]),
  bulkAction
);

export default router;