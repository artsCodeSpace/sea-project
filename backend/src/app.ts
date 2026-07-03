import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase";
import reviewRoutes from "./routes/review.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";
import contentRoutes from "./routes/content.routes";
import mediaRoutes from "./routes/media.routes";
import contactRoutes from "./routes/contact.routes";
import analyticsRoutes from "./routes/analytics.routes";
import publicRoutes from "./routes/public.routes";


const app = express();

app.use('/api/public', contactRoutes);

app.use(cors({
  origin: [
      "http://localhost:3000",
      "https://your-project.vercel.app",
    ],
    credentials: true,
}));
app.use(express.json());

// Register API routes
app.use("/api/review", reviewRoutes); // Keeps compatibility for public review submission
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/public", publicRoutes);

app.get("/", (_, res) => {
  res.send("Backend is running 🚀");
});

// Test Supabase connection
app.get("/test-db", async (_, res) => {
  const { data, error } = await supabase
    .from("review")
    .select("*");

  if (error) {
    return res.status(500).json(error);
  }

  return res.json(data);
});

export default app;