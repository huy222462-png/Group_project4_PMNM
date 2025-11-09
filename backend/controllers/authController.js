import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "../utils/emailService.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Đăng ký tài khoản
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Include role in JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role || "user"
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: "1d",
      }
    );

    // Return user info (without password)
    const userInfo = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role || "user",
      avatar: user.avatar
    };

    res.status(200).json({ 
      message: "Login successful", 
      token,
      user: userInfo
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Đăng xuất
export const logout = (req, res) => {
  try {
    console.log("✅ LOGOUT HANDLER CALLED - NO AUTH REQUIRED");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Forgot Password - Gửi email với token reset
export const forgotPassword = async (req, res) => {
  try {
    console.log("📧 Forgot password request received for:", req.body.email);
    
    const { email } = req.body;

    if (!email) {
      console.log("❌ No email provided");
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ User not found for email:", email);
      // Không tiết lộ user có tồn tại hay không vì lý do bảo mật
      return res.status(200).json({ 
        message: "If the email exists, a password reset link has been sent" 
      });
    }

    console.log("✅ User found, generating reset token...");
    
    // Tạo reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    
    // Hash token trước khi lưu vào DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Lưu token và thời gian hết hạn vào DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    console.log("✅ Token saved to database, sending email...");

    // Gửi email với token gốc (chưa hash)
    const emailResult = await sendPasswordResetEmail(email, resetToken);

    if (!emailResult.success) {
      console.error("❌ Email sending failed:", emailResult.error);
      return res.status(500).json({ 
        message: "Error sending email. Please try again later.",
        details: emailResult.error
      });
    }

    console.log("✅ Password reset email sent successfully");
    res.status(200).json({ 
      message: "Password reset link has been sent to your email" 
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    console.error("❌ Error stack:", error.stack);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === 'production' ? undefined : error.message
    });
  }
};

// ✅ Reset Password - Đổi password với token
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters" 
      });
    }

    // Hash token từ URL để so sánh với DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Tìm user với token hợp lệ và chưa hết hạn
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ 
        message: "Invalid or expired reset token" 
      });
    }

    // Hash password mới
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật password và xóa token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({ 
      message: "Password has been reset successfully" 
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
