const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Lấy toàn bộ danh sách người dùng
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Thêm người dùng mới
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
const userController = require('../controllers/userController');

// Không cần /users ở đây nữa vì đã có app.use('/users', userRoutes)
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
