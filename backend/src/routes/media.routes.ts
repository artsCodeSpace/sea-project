import express from "express";
import { upload } from "../middleware/upload";
import { getMedia, uploadMedia, deleteMedia } from "../controllers/media.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);
router.use(requireRole(["Super Admin", "Administrator"]));

router.get("/", getMedia);
router.post("/", upload.single("file"), uploadMedia);
router.delete("/:name", deleteMedia);

export default router;
