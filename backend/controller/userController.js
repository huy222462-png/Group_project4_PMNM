// controllers/userController.js
let users = []; // mảng tạm lưu user

// GET /users -> trả về danh sách user
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST /users -> thêm user mới
exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name và Email không được để trống" });
  }

  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};
