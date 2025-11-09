import express from "express";
import { 
  signup, 
  login, 
  logout,
  forgotPassword,
  resetPassword 
} from "../controllers/authController.js";
import { 
  getProfile, 
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole
} from "../controllers/userController.js";
import { uploadAvatar, deleteAvatar } from "../controllers/uploadController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import upload from "../middleware/multerUpload.js";

const router = express.Router();

// =====================================================
// AUTH ROUTES (Public)
// =====================================================
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// =====================================================
// USER PROFILE ROUTES (Authenticated)
// =====================================================
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

// =====================================================
// UPLOAD AVATAR ROUTES (Authenticated)
// =====================================================
router.post("/upload-avatar", authenticate, upload.single("avatar"), uploadAvatar);
router.delete("/delete-avatar", authenticate, deleteAvatar);

// =====================================================
// ADMIN ROUTES (Admin only)
// =====================================================
// Get all users (Authenticated users can view)
router.get("/users", authenticate, getAllUsers);

// Get user by ID (Authenticated users can view)
router.get("/users/:id", authenticate, getUserById);

// Delete user (Admin only)
router.delete("/users/:id", authenticate, authorizeRoles("admin"), deleteUser);

// Update user role (Admin only)
router.put("/users/:id/role", authenticate, authorizeRoles("admin"), updateUserRole);

export default router;
