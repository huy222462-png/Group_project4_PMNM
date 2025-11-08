const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/upload');
const authenticate = require('../middleware/auth'); // giả sử file auth đã có

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// upload avatar: phải có token, field form-data là "avatar"
router.post('/upload-avatar', authenticate, upload.single('avatar'), authController.uploadAvatar);

module.exports = router;