import express from "express";
import { upload } from "../middleware/upload";
import { createReview } from "../controllers/review.controller";

const router = express.Router();

router.post(
  "/",
  upload.single("photo"),
  createReview
);

export default router;