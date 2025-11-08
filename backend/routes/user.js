const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware'); // middleware phân quyền

// ============================================
// API User (Admin + User)
// ============================================

// GET /api/users - Lấy danh sách tất cả user (chỉ Admin)
router.get(
  '/',
  protect, // Xác thực token
  authorizeRoles('admin'), // Chỉ admin được xem danh sách
  userController.getAllUsers
);

// POST /api/users - Tạo user mới (Admin có thể thêm)
router.post(
  '/',
  protect,
  authorizeRoles('admin'), // Chỉ admin được tạo
  userController.createUser
);

// PUT /api/users/:id - Cập nhật user (Admin hoặc chính chủ)
router.put(
  '/:id',
  protect,
  userController.updateUser
);

// DELETE /api/users/:id - Xóa user (Admin hoặc chính chủ)
router.delete(
  '/:id',
  protect,
  userController.deleteUser
);

module.exports = router;