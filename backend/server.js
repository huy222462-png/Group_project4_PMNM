import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Cấu hình CORS linh hoạt - Đọc từ environment variable
const allowedOrigins = [
  "http://localhost:3000", // Local development
  ...(process.env.CLIENT_URL || "").split(",").map(url => url.trim()).filter(Boolean) // Support multiple origins
].filter(Boolean); // Remove undefined values

// Helper function to check if origin matches (supports wildcards)
const isOriginAllowed = (origin) => {
  if (!origin) return true; // Allow requests with no origin (Postman, mobile apps)
  
  return allowedOrigins.some(pattern => {
    if (pattern === origin) return true; // Exact match
    
    // Wildcard matching: https://*.vercel.app matches https://xyz.vercel.app
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace(/\*/g, '.*').replace(/\./g, '\\.') + '$');
      return regex.test(origin);
    }
    
    return false;
  });
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
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

// Lightweight health endpoint for quick testing (won't interfere with SPA static serving)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', environment: process.env.NODE_ENV || 'production' });
});

// --- Serve React frontend (if built) --------------------------------------------------
// This will allow visiting the root URL to return the frontend app instead of "Cannot GET /".
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const buildPath = path.resolve(__dirname, "../frontend/build");

  // Only add static serving if the build folder exists
  // (keeps behavior identical when deploying backend-only APIs)
  // eslint-disable-next-line no-undef
  import('fs').then(fs => {
    if (fs.existsSync(buildPath)) {
      app.use(express.static(buildPath));

      // For SPA routing, return index.html for any unknown route (except /api)
      app.get('*', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'));
      });
    }
  }).catch(() => {
    // ignore fs import errors; static serving simply won't be enabled
  });
// -------------------------------------------------------------------------------------
} catch (err) {
  // If something goes wrong determining paths, do not crash the server; keep API only.
  console.warn('Warning: frontend static serving not enabled:', err.message);
}

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
// Before starting, do a safe check for required environment variables (do NOT print secret values)
const requiredEnv = ["MONGODB_URI", "JWT_SECRET", "CLOUDINARY_URL"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`);
} else {
  console.log("✅ All required environment variables are present (values hidden)");
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
