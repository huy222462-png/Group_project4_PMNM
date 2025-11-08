# 🔐 ADMIN PANEL & RBAC - DOCUMENTATION

## 📋 Tổng quan

Hệ thống quản lý Admin với phân quyền RBAC (Role-Based Access Control):
- ✅ **Admin Panel** - Giao diện quản lý users
- ✅ **User List** - Danh sách tất cả users
- ✅ **Delete User** - Xóa tài khoản (Admin hoặc tự xóa)
- ✅ **Role Management** - Thay đổi quyền user/admin
- ✅ **RBAC** - Phân quyền User và Admin

---

## 🎯 Tính năng đã implement

### Backend

#### 1. User Model (với role)
```javascript
{
  name: String,
  email: String,
  password: String,
  avatar: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}
```

#### 2. Admin APIs

**GET /api/users** - Lấy danh sách users (Admin only)
- Middleware: `authenticate`, `authorizeRoles("admin")`
- Response: Array of users (without passwords)

**GET /api/users/:id** - Lấy thông tin 1 user (Admin only)
- Middleware: `authenticate`, `authorizeRoles("admin")`
- Response: User object

**DELETE /api/users/:id** - Xóa user
- Middleware: `authenticate`
- Logic: Admin xóa bất kỳ ai, User chỉ xóa chính mình
- Protection: Không xóa admin cuối cùng

**PUT /api/users/:id/role** - Cập nhật role (Admin only)
- Middleware: `authenticate`, `authorizeRoles("admin")`
- Body: `{ role: "user" | "admin" }`
- Protection: 
  - Không tự thay đổi role của mình
  - Không hạ quyền admin cuối cùng

#### 3. Role Middleware
```javascript
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Access denied: Insufficient role" 
      });
    }
    next();
  };
};
```

#### 4. JWT Token (với role)
```javascript
const token = jwt.sign(
  { 
    id: user._id,
    role: user.role || "user"
  }, 
  process.env.JWT_SECRET
);
```

### Frontend

#### 1. AdminPanel Component
**Features:**
- Hiển thị danh sách tất cả users
- Statistics cards (Total Users, Admins, Regular Users)
- Table với avatar, name, email, role, joined date
- Actions: Change Role, Delete
- Real-time updates
- Loading states
- Success/Error messages

**UI Elements:**
- Modern gradient design
- Responsive table
- Role badges (Admin/User)
- Inline role editing
- Confirmation dialogs

#### 2. Protected Routes với Role Check
```jsx
<ProtectedRoute adminOnly={true}>
  <AdminPanel />
</ProtectedRoute>
```

#### 3. Navbar với Admin Link
- Hiển thị Admin badge cho admin users
- Admin Panel button (chỉ admin thấy)
- Role-based navigation

#### 4. API Integration
```javascript
// Get all users
authAPI.getAllUsers()

// Delete user
authAPI.deleteUser(userId)

// Update user role
authAPI.updateUserRole(userId, role)
```

---

## 🔧 Implementation Details

### Backend Files

```
backend/
├── models/
│   └── User.js                    ✏️ UPDATED (added role field)
├── controllers/
│   ├── authController.js          ✏️ UPDATED (JWT with role)
│   └── userController.js          ✏️ UPDATED (admin functions)
├── middleware/
│   ├── authMiddleware.js          ✅ EXISTS
│   └── roleMiddleware.js          ✅ EXISTS
└── routes/
    └── index.js                   ✏️ UPDATED (admin routes)
```

### Frontend Files

```
frontend/
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx         ⭐ NEW
│   │   ├── ProtectedRoute.jsx     ✏️ UPDATED (adminOnly)
│   │   ├── Navbar.jsx             ✏️ UPDATED (admin link)
│   │   └── Login.jsx              ✏️ UPDATED (save user with role)
│   ├── styles/
│   │   ├── AdminPanel.css         ⭐ NEW
│   │   └── Navbar.css             ✏️ UPDATED (admin badge)
│   ├── services/
│   │   └── api.js                 ✏️ UPDATED (admin APIs)
│   └── App.jsx                    ✏️ UPDATED (/admin route)
```

---

## 🚀 Cách sử dụng

### 1. Tạo Admin Account

**Option 1: Via MongoDB**
```javascript
// Connect to MongoDB and update a user
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

**Option 2: Via Backend Code (one-time)**
```javascript
// In authController.js, temporarily modify signup
const newUser = new User({
  name,
  email,
  password: hashedPassword,
  role: "admin"  // Add this line temporarily
});
```

### 2. Login as Admin
1. Đăng nhập với admin account
2. Sẽ thấy badge "(Admin)" bên cạnh tên
3. Thấy nút "Admin Panel" trên Navbar

### 3. Access Admin Panel
- Click "Admin Panel" trên Navbar
- Hoặc truy cập: `http://localhost:3000/admin`
- Chỉ admin mới vào được

### 4. Manage Users
**View Users:**
- Xem danh sách tất cả users
- Xem statistics (total, admins, users)
- Xem thông tin chi tiết

**Change Role:**
- Click "Change Role" button
- Select User/Admin từ dropdown
- Click "Save"

**Delete User:**
- Click "Delete" button
- Confirm trong dialog
- User bị xóa khỏi database

---

## 🔒 Security Features

### 1. Role-Based Access Control (RBAC)
- **Admin**: Full access to all features
- **User**: Limited access, only personal data

### 2. Protected Routes
- `/admin` - Chỉ admin
- `/profile` - Authenticated users
- `/` - Authenticated users

### 3. API Protection
- JWT authentication required
- Role checking middleware
- 403 Forbidden for insufficient permissions

### 4. Business Logic Protection
- Không xóa admin cuối cùng
- Không tự thay đổi role của mình
- Không hạ quyền admin cuối cùng
- User chỉ xóa chính mình

---

## 📊 API Endpoints

### Admin Endpoints

#### GET /api/users
**Access:** Admin only
**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "...",
      "name": "User Name",
      "email": "user@example.com",
      "role": "user",
      "avatar": "...",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### GET /api/users/:id
**Access:** Admin only
**Response:**
```json
{
  "success": true,
  "data": { /* user object */ }
}
```

#### DELETE /api/users/:id
**Access:** Admin (any user) or User (self only)
**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Error Cases:**
```json
// Not authorized
{
  "success": false,
  "message": "You can only delete your own account"
}

// Last admin
{
  "success": false,
  "message": "Cannot delete the last admin account"
}
```

#### PUT /api/users/:id/role
**Access:** Admin only
**Body:**
```json
{
  "role": "admin" // or "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User role updated to admin successfully",
  "data": { /* updated user */ }
}
```

**Error Cases:**
```json
// Invalid role
{
  "success": false,
  "message": "Invalid role. Must be 'user' or 'admin'"
}

// Self change
{
  "success": false,
  "message": "You cannot change your own role"
}

// Last admin
{
  "success": false,
  "message": "Cannot demote the last admin"
}
```

---

## 🧪 Testing Guide

### Test Scenarios

#### 1. Admin Login
- [x] Login với admin account
- [x] Thấy "(Admin)" badge
- [x] Thấy "Admin Panel" button
- [x] Access /admin successful

#### 2. User Login
- [x] Login với user account
- [x] Không thấy "(Admin)" badge
- [x] Không thấy "Admin Panel" button
- [x] Access /admin → Access Denied

#### 3. View Users (Admin)
- [x] Thấy danh sách tất cả users
- [x] Statistics đúng
- [x] Table hiển thị đầy đủ info
- [x] Role badges hiển thị đúng

#### 4. Change Role (Admin)
- [x] Click "Change Role"
- [x] Select role từ dropdown
- [x] Click "Save" → Success
- [x] User role updated
- [x] Cannot change own role → Error
- [x] Cannot demote last admin → Error

#### 5. Delete User (Admin)
- [x] Click "Delete" on any user
- [x] Confirm dialog appears
- [x] Confirm → User deleted
- [x] Cancel → No action
- [x] Cannot delete self → Button disabled
- [x] Cannot delete last admin → Error

#### 6. Delete Own Account (User)
- [x] User can delete own account
- [x] Confirm dialog appears
- [x] Account deleted → Logout

#### 7. Protected Routes
- [x] /admin without login → Redirect to /login
- [x] /admin as user → Access Denied
- [x] /admin as admin → Access granted

---

## 💡 Tips & Best Practices

### 1. Creating First Admin
```bash
# MongoDB Shell
use your_database
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

### 2. Role Check
```javascript
// In components
const { user } = useAuth();
if (user?.role === "admin") {
  // Admin only code
}
```

### 3. API Error Handling
```javascript
try {
  const response = await authAPI.deleteUser(userId);
} catch (error) {
  const message = error.response?.data?.message || "Error";
  // Handle error
}
```

---

## 🐛 Troubleshooting

### "Access Denied" on Admin Panel
**Cause:** User không phải admin
**Fix:** 
- Check user role trong localStorage
- Update role trong MongoDB
- Login lại

### Cannot Delete User
**Cause:** 
- Trying to delete self
- Trying to delete last admin
**Fix:** 
- Admin cannot delete self
- Must have at least 1 admin

### Cannot Change Role
**Cause:**
- Trying to change own role
- Trying to demote last admin
**Fix:**
- Ask another admin to change
- Create another admin first

---

## ✅ Summary

### Hoàn thành:
- ✅ User Model với role field
- ✅ JWT token bao gồm role
- ✅ Admin APIs (GET users, DELETE user, UPDATE role)
- ✅ Role middleware (authorizeRoles)
- ✅ AdminPanel component
- ✅ Protected routes với adminOnly
- ✅ Navbar với admin link
- ✅ Role-based UI display
- ✅ Full RBAC implementation

### Security:
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Protected admin routes
- ✅ Business logic protection
- ✅ Input validation

### Features:
- ✅ View all users
- ✅ Delete users (với restrictions)
- ✅ Change user roles (với restrictions)
- ✅ Statistics display
- ✅ Real-time updates

---

**Sinh viên 2**: Admin Panel & RBAC - ✅ COMPLETED

**Date**: November 9, 2025
