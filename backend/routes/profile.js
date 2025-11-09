import express from "express";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import { authenticate } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uid = req.user?.id || req.user?._id || Date.now();
    cb(null, `avatar_${uid}_${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.user;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/", authenticate, upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.user;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.body.name) user.name = req.body.name;

    if (req.file) {
      user.avatar = `/uploads/${req.file.filename}`;
    } else if (req.body.avatarURL) {
      user.avatar = req.body.avatarURL;
    }

    if (req.body.newPassword) {
      if (!req.body.currentPassword)
        return res.status(400).json({ message: "currentPassword required" });

      const match = await bcrypt.compare(req.body.currentPassword, user.password);
      if (!match) return res.status(400).json({ message: "Current password incorrect" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.newPassword, salt);
    }

    await user.save();
    const out = user.toObject();
    delete out.password;
    res.json(out);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;