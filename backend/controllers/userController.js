import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ GET /api/profile - Lấy thông tin người dùng
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    const user = await User.findById(userId).select("-password -__v");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching profile" 
    });
  }
};

// ✅ PUT /api/profile - Cập nhật thông tin người dùng
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, email, avatar, currentPassword, newPassword } = req.body;

    // Tìm user hiện tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Validate và update name
    if (name !== undefined) {
      if (name.trim().length === 0) {
        return res.status(400).json({ 
          success: false,
          message: "Name cannot be empty" 
        });
      }
      user.name = name.trim();
    }

    // Validate và update email
    if (email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid email format" 
        });
      }
      
      // Kiểm tra email đã tồn tại chưa (trừ email của user hiện tại)
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: "Email already in use" 
        });
      }
      
      user.email = email.toLowerCase();
    }

    // Update avatar
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    // Update password nếu được cung cấp
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false,
          message: "Current password is required to set new password" 
        });
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          message: "Current password is incorrect" 
        });
      }

      // Validate new password length
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: "New password must be at least 6 characters" 
        });
      }

      // Hash và update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Lưu thay đổi
    await user.save();

    // Trả về user đã update (không bao gồm password)
    const updatedUser = user.toObject();
    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while updating profile" 
    });
  }
};
// ✅ Import các thư viện cần thiết
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Import routes (nếu bạn đặt file routes là user.js)
const userRoutes = require('./routes/user');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Định tuyến API chuẩn nhóm
app.use('/api', userRoutes);

// ✅ Debug: in ra URI kết nối
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

// ✅ Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

