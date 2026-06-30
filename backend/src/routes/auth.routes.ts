import express from "express";
import { login, getMe, setup } from "../controllers/auth.controller";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.post("/setup", setup);
router.post("/login", login);
router.get("/me", authenticateJWT, getMe);

export default router;
