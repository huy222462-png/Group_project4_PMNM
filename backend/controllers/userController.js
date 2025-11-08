// controllers/userController.js
import User from "../models/User.js";

// Profile
export const getProfile = (req, res) => {
  res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const { name, email, avatar } = req.body;
  try {
    if (name) req.user.name = name;
    if (email) req.user.email = email;
    if (avatar) req.user.avatar = avatar;
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: get all users
export const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Admin: delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.remove();
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};