const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Chỉ dùng '/' vì server đã gắn prefix '/users'
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;