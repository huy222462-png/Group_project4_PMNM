const User = require('../models/User');

// GET /users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /users
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Thiếu name hoặc email" });
  }

  const newUser = new User({ name, email });

  try {
    const savedUser = await newUser.save();  // lưu vào MongoDB
    res.status(201).json({ message: "User added successfully", data: savedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
