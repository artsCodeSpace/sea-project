import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  updateStatus,
  resetPassword,
  deleteUser,
} from "../controllers/user.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

// All user management routes require Super Admin role
router.use(authenticateJWT);
router.use(requireRole(["Super Admin"]));

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.put("/:id/status", updateStatus);
router.put("/:id/password", resetPassword);
router.delete("/:id", deleteUser);

export default router;
