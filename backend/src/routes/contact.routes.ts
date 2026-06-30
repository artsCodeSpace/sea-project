import express from "express";
import { getContacts, updateContact, deleteContact } from "../controllers/contact.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

router.use(authenticateJWT);
router.use(requireRole(["Super Admin", "Administrator", "Moderator"]));

router.get("/", getContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
