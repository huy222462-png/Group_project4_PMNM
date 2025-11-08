import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { 
  getProfile, 
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserRole
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================================
// AUTH ROUTES (Public)
// =====================================================
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// =====================================================
// USER PROFILE ROUTES (Authenticated)
// =====================================================
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

// =====================================================
// ADMIN ROUTES (Admin only)
// =====================================================
// Get all users
router.get("/users", authenticate, authorizeRoles("admin"), getAllUsers);

// Get user by ID
router.get("/users/:id", authenticate, authorizeRoles("admin"), getUserById);

// Delete user (Admin or self)
router.delete("/users/:id", authenticate, deleteUser);

// Update user role (Admin only)
router.put("/users/:id/role", authenticate, authorizeRoles("admin"), updateUserRole);

export default router;
