let users = [
  { id: 1, name: "Huy", email: "huy@gmail.com" },
  { id: 2, name: "Thanh", email: "thanh@gmail.com" }
];

// GET: lấy danh sách user
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST: thêm user mới
exports.createUser = (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT: cập nhật user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id == id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
const User = require('../models/User');
  }
};

// GET: lấy danh sách user
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST: thêm user mới
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT: cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE: xóa user

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id != id);
  res.json({ message: "User deleted" });
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
};
