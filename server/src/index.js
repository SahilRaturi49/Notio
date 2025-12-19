import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import noteRoutes from "./routes/note.route.js";

dotenv.config();
const app = express();

connectDB();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
