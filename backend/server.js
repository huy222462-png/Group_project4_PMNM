import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Cấu hình CORS linh hoạt - Đọc từ environment variable
const allowedOrigins = [
  "http://localhost:3000", // Local development
  process.env.CLIENT_URL || "https://your-project.vercel.app" // Production frontend
].filter(Boolean); // Remove undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS Error: Origin ${origin} not allowed`));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Đăng ký routes
app.use("/api", routes);

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware xử lý lỗi chung (tránh server crash)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Chạy server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
