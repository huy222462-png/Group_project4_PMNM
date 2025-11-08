# 🚀 ADMIN PANEL - QUICK START GUIDE

## ⚡ Setup & Run

### 1. Backend
```bash
cd backend
node server.js
```
✅ Server: `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm start
```
✅ App: `http://localhost:3000`

---

## 👤 Tạo Admin Account

### Method 1: MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# Use your database
use your_database_name

# Update user to admin
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 2: MongoDB Compass
1. Mở MongoDB Compass
2. Connect to your database
3. Tìm collection `users`
4. Tìm user cần promote
5. Edit document, thêm/sửa field:
   ```json
   "role": "admin"
   ```
6. Save

### Method 3: Temporary Code (Backend)
```javascript
// In backend/controllers/authController.js
// Temporarily modify signup function
const newUser = new User({
  name,
  email,
  password: hashedPassword,
  role: "admin"  // Add this temporarily
});
```
- Đăng ký 1 account
- Remove dòng code
- Restart server

---

## 🎯 Sử dụng Admin Panel

### Bước 1: Login as Admin
```
1. Go to http://localhost:3000/login
2. Login with admin account
3. Sẽ thấy "(Admin)" badge bên cạnh tên
4. Thấy nút "Admin Panel" màu vàng
```

### Bước 2: Access Admin Panel
```
1. Click "Admin Panel" button
2. Hoặc vào: http://localhost:3000/admin
3. Thấy giao diện quản lý users
```

### Bước 3: View Users
```
- Statistics Cards:
  • Total Users
  • Total Admins
  • Total Regular Users

- Users Table:
  • Avatar
  • Name
  • Email
  • Role (Admin/User badge)
  • Joined Date
  • Actions
```

### Bước 4: Change User Role
```
1. Click "Change Role" button
2. Select "User" or "Admin" from dropdown
3. Click "Save"
4. Success message appears
5. Role updated immediately
```

**Limitations:**
- ❌ Cannot change own role
- ❌ Cannot demote last admin

### Bước 5: Delete User
```
1. Click "Delete" button
2. Confirm in dialog
3. User deleted from database
4. List refreshes automatically
```

**Limitations:**
- ❌ Cannot delete yourself
- ❌ Cannot delete last admin

---

## 🔑 Roles & Permissions

### Admin
- ✅ View all users
- ✅ Delete any user (except self & last admin)
- ✅ Change any user role (except self)
- ✅ Access Admin Panel
- ✅ Access all features

### User
- ✅ View own profile
- ✅ Update own profile
- ✅ Delete own account
- ❌ Cannot access Admin Panel
- ❌ Cannot view other users
- ❌ Cannot delete other users

---

## 📱 UI Preview

### Admin Navbar
```
┌──────────────────────────────────────────┐
│ User Management                          │
│                                          │
│  Xin chào, Admin User (Admin)           │
│  [Trang chủ] [Profile] [Admin Panel]    │
│  [Đăng xuất]                             │
└──────────────────────────────────────────┘
```

### Regular User Navbar
```
┌──────────────────────────────────────────┐
│ User Management                          │
│                                          │
│  Xin chào, Regular User                 │
│  [Trang chủ] [Profile] [Đăng xuất]      │
└──────────────────────────────────────────┘
```

### Admin Panel
```
┌──────────────────────────────────────────┐
│      Admin Panel - User Management       │
│        Manage all users in the system    │
├──────────────────────────────────────────┤
│  [10]         [2]          [8]           │
│  Total Users  Admins       Regular Users │
├──────────────────────────────────────────┤
│ Avatar | Name  | Email | Role | Actions │
├──────────────────────────────────────────┤
│  [A]   | Admin | a@... | 🟡  | [Edit] X │
│  [U]   | User1 | u@... | ⚪  | [Edit][D]│
│  [U]   | User2 | u@... | ⚪  | [Edit][D]│
└──────────────────────────────────────────┘
```

---

## 🧪 Test Scenarios

### Test as Admin
```bash
# 1. Create admin account (see above)
# 2. Login as admin
# 3. Verify badge shows "(Admin)"
# 4. Verify "Admin Panel" button visible
# 5. Click "Admin Panel"
# 6. Test features:
   - View all users ✓
   - Change user role ✓
   - Delete user (not self) ✓
   - Statistics display ✓
```

### Test as Regular User
```bash
# 1. Login as regular user
# 2. Verify no "(Admin)" badge
# 3. Verify no "Admin Panel" button
# 4. Try access http://localhost:3000/admin
# 5. Should see "Access Denied" message
```

---

## 🎨 Features Checklist

### Admin Panel UI
- [x] Statistics cards với gradient
- [x] Responsive table
- [x] Avatar display
- [x] Role badges (Admin=Yellow, User=Gray)
- [x] Inline role editing
- [x] Action buttons
- [x] Loading states
- [x] Success/Error messages
- [x] Confirmation dialogs

### Functionality
- [x] Fetch all users
- [x] Display user list
- [x] Change user role
- [x] Delete user
- [x] Real-time updates
- [x] Error handling
- [x] Business logic protection

### Security
- [x] JWT authentication
- [x] Role-based access
- [x] Protected routes
- [x] Cannot delete self
- [x] Cannot delete last admin
- [x] Cannot change own role

---

## 🔧 API Endpoints

### Admin APIs
```
GET    /api/users           - Get all users (Admin only)
GET    /api/users/:id       - Get user by ID (Admin only)
DELETE /api/users/:id       - Delete user (Admin or self)
PUT    /api/users/:id/role  - Update role (Admin only)
```

### Test with cURL

**Get All Users (Admin)**
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Delete User (Admin)**
```bash
curl -X DELETE http://localhost:5000/api/users/USER_ID \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Update Role (Admin)**
```bash
curl -X PUT http://localhost:5000/api/users/USER_ID/role \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"role":"admin"}'
```

---

## 💡 Pro Tips

### 1. Always Keep 1 Admin
- Hệ thống bảo vệ admin cuối cùng
- Tạo ít nhất 2 admin accounts
- Backup admin credentials

### 2. Role Management
- User role: Mặc định cho mọi signup
- Admin role: Phải được promote
- Không tự promote chính mình

### 3. Delete Protection
- Admin không thể xóa chính mình
- User có thể xóa account của mình
- Confirm trước khi xóa

### 4. Testing
```bash
# Create test users
# 1 admin + multiple regular users
# Test all scenarios
```

---

## 🐛 Common Issues

### "Access Denied" khi vào /admin
**Cause:** Không phải admin
**Fix:** 
```javascript
// Check role in localStorage
console.log(JSON.parse(localStorage.getItem('user')))
// Should have: role: "admin"

// Update in MongoDB if needed
```

### Admin Panel button không hiện
**Cause:** User role không phải "admin"
**Fix:**
- Check user object in console
- Update role trong database
- Logout và login lại

### Cannot change role
**Cause:** Trying to change own role
**Fix:** Ask another admin to change it

---

## 📚 Documentation Files

1. **ADMIN_RBAC_DOCUMENTATION.md** - Full documentation
2. **ADMIN_QUICK_START.md** - This file
3. Backend files in `backend/`
4. Frontend files in `frontend/src/`

---

## ✅ Summary

**Setup:**
1. ✅ Create admin account
2. ✅ Login as admin
3. ✅ Access Admin Panel

**Features:**
- ✅ View all users
- ✅ Statistics display
- ✅ Change user roles
- ✅ Delete users
- ✅ Role-based access

**Security:**
- ✅ JWT + Role authentication
- ✅ Protected routes
- ✅ Business logic protection

---

**Ready to manage users! 🎉**

**Date**: November 9, 2025
