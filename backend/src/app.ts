import express from "express";
import cors from "cors";
import { supabase } from "./config/supabase";
import reviewRoutes from "./routes/review.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/review", reviewRoutes);

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