import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import fs from "fs";

// ✅ Upload Avatar lên Cloudinary
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload ảnh lên Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      transformation: [
        { width: 500, height: 500, crop: "fill", gravity: "face" },
        { quality: "auto" },
        { fetch_format: "auto" }
      ]
    });

    // Xóa file tạm trong local
    fs.unlinkSync(req.file.path);

    // Cập nhật avatar URL vào database
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Nếu user đã có avatar cũ trên Cloudinary, xóa nó
    if (user.avatar && user.avatar.includes("cloudinary")) {
      const publicId = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`avatars/${publicId}`);
    }

    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({
      message: "Avatar uploaded successfully",
      avatar: result.secure_url,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Upload avatar error:", error);
    
    // Xóa file tạm nếu có lỗi
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      message: "Error uploading avatar",
      error: error.message 
    });
  }
};

// ✅ Xóa Avatar
export const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Xóa ảnh trên Cloudinary nếu có
    if (user.avatar && user.avatar.includes("cloudinary")) {
      const publicId = user.avatar.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`avatars/${publicId}`);
    }

    user.avatar = "";
    await user.save();

    res.status(200).json({ 
      message: "Avatar deleted successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Delete avatar error:", error);
    res.status(500).json({ 
      message: "Error deleting avatar",
      error: error.message 
    });
  }
};
