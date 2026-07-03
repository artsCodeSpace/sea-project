// contact.routes.ts
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { getContacts, updateContact, deleteContact } from "../controllers/contact.controller";
import { authenticateJWT, requireRole } from "../middleware/auth";

const router = express.Router();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==================== PUBLIC ROUTE (No Auth) ====================
router.post('/contacts', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Name, email and message are required" 
      });
    }

    await transporter.sendMail({
      from: `"Seatown Website" <${process.env.EMAIL_USER}>`,
      to: process.env.CLIENT_EMAIL,
      replyTo: email,
      subject: `New Inquiry from ${name} - ${service || 'General'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background:#f9f9f9; padding:15px; border-radius:8px;">
            ${message}
          </p>
          <hr>
          <small>Sent from Seatown Container Line Website</small>
        </div>
      `
    });

    res.json({ success: true, message: "Inquiry submitted successfully" });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send message. Please try again later." 
    });
  }
});

// ==================== PROTECTED ROUTES ====================
router.use(authenticateJWT);
router.use(requireRole(["Super Admin", "Administrator", "Moderator"]));

router.get("/", getContacts);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;
