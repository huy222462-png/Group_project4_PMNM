import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
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
