import express from "express";
import { getStats, getDashboardData, getAuditLogs } from "../controllers/analytics.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);

// Stats and Dashboard data require at least Viewer role
router.get("/stats", requireRole(["Super Admin", "Administrator", "Editor", "Moderator", "Viewer"]), getStats);
router.get("/dashboard", requireRole(["Super Admin", "Administrator", "Editor", "Moderator", "Viewer"]), getDashboardData);

// Audit logs require Super Admin or Administrator role
router.get("/audit-logs", requireRole(["Super Admin", "Administrator"]), getAuditLogs);

export default router;
