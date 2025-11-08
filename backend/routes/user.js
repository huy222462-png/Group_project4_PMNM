// routes/userRoutes.js
import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { getProfile, updateProfile, getUsers, deleteUser } from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// User Profile
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);

// Admin
router.get("/users", authenticate, authorize("Admin"), getUsers);
router.delete("/users/:id", authenticate, authorize("Admin"), deleteUser);

export default router;