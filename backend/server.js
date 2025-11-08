import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - cho phép frontend gọi API
app.use(cors({
  origin: "http://localhost:3000", // React app URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

// Log registered routes for debugging
try {
  console.log("Registered API routes:");
  routes.stack.forEach((layer) => {
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(',');
      console.log(methods, '/api' + layer.route.path);
    }
  });
} catch (err) {
  console.log("Could not enumerate routes:", err.message);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
