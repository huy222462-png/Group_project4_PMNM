import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ GET /api/profile - Lấy thông tin người dùng
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    
    const user = await User.findById(userId).select("-password -__v");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching profile" 
    });
  }
};

// ✅ PUT /api/profile - Cập nhật thông tin người dùng
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, email, avatar, currentPassword, newPassword } = req.body;

    // Tìm user hiện tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Validate và update name
    if (name !== undefined) {
      if (name.trim().length === 0) {
        return res.status(400).json({ 
          success: false,
          message: "Name cannot be empty" 
        });
      }
      user.name = name.trim();
    }

    // Validate và update email
    if (email !== undefined) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          success: false,
          message: "Invalid email format" 
        });
      }
      
      // Kiểm tra email đã tồn tại chưa (trừ email của user hiện tại)
      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: "Email already in use" 
        });
      }
      
      user.email = email.toLowerCase();
    }

    // Update avatar
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    // Update password nếu được cung cấp
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ 
          success: false,
          message: "Current password is required to set new password" 
        });
      }

      // Verify current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ 
          success: false,
          message: "Current password is incorrect" 
        });
      }

      // Validate new password length
      if (newPassword.length < 6) {
        return res.status(400).json({ 
          success: false,
          message: "New password must be at least 6 characters" 
        });
      }

      // Hash và update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Lưu thay đổi
    await user.save();

    // Trả về user đã update (không bao gồm password)
    const updatedUser = user.toObject();
    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while updating profile" 
    });
  }
};

// =====================================================
// ADMIN FUNCTIONS
// =====================================================

// ✅ GET /api/users - Lấy danh sách tất cả users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching users" 
    });
  }
};

// ✅ GET /api/users/:id - Lấy thông tin 1 user (Admin only)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password -__v");
    
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while fetching user" 
    });
  }
};

// ✅ DELETE /api/users/:id - Xóa user (Admin hoặc tự xóa)
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id || req.user._id;
    const currentUserRole = req.user.role;

    // Tìm user cần xóa
    const userToDelete = await User.findById(userId);
    
    if (!userToDelete) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Kiểm tra quyền: Admin có thể xóa bất kỳ ai, user thường chỉ xóa chính mình
    if (currentUserRole !== "admin" && userId !== currentUserId.toString()) {
      return res.status(403).json({ 
        success: false,
        message: "You can only delete your own account" 
      });
    }

    // Không cho phép xóa chính mình nếu là admin duy nhất
    if (currentUserRole === "admin" && userId === currentUserId.toString()) {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(403).json({ 
          success: false,
          message: "Cannot delete the last admin account" 
        });
      }
    }

    // Xóa user
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while deleting user" 
    });
  }
};

// ✅ PUT /api/users/:id/role - Cập nhật role user (Admin only)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    const currentUserId = req.user.id || req.user._id;

    // Validate role
    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid role. Must be 'user' or 'admin'" 
      });
    }

    // Tìm user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found" 
      });
    }

    // Không cho phép tự thay đổi role của chính mình
    if (userId === currentUserId.toString()) {
      return res.status(403).json({ 
        success: false,
        message: "You cannot change your own role" 
      });
    }

    // Không cho phép hạ quyền admin cuối cùng
    if (user.role === "admin" && role === "user") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(403).json({ 
          success: false,
          message: "Cannot demote the last admin" 
        });
      }
    }

    // Update role
    user.role = role;
    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json({
      success: true,
      message: `User role updated to ${role} successfully`,
      data: updatedUser
    });
  } catch (error) {
    console.error("Update user role error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error while updating user role" 
    });
  }
};

