import express from "express";
import { getContent, updateContent } from "../controllers/content.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);
router.use(requireRole(["Super Admin", "Administrator"]));

router.get("/:key", getContent);
router.put("/:key", updateContent);

export default router;
