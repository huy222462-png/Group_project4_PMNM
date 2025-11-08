# 🚀 HƯỚNG DẪN CHẠY PROJECT - USER MANAGEMENT SYSTEM

## 📋 Tổng quan dự án

Hệ thống quản lý người dùng với các tính năng:
- ✅ Authentication (Đăng ký, Đăng nhập, Đăng xuất)
- ✅ Profile Management (Xem & Cập nhật thông tin cá nhân)
- ✅ Admin Panel (Quản lý users, Phân quyền RBAC)

---

## 📦 Yêu cầu hệ thống

### Phần mềm cần cài đặt:
- **Node.js** (v14 trở lên) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** (FREE) - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Git** (optional) - [Download](https://git-scm.com/)

### Kiểm tra cài đặt:
```bash
node --version    # Should show v14+ 
npm --version     # Should show 6+
```

---

## 🔧 BƯỚC 1: Setup Backend

### 1.1. Navigate to backend folder
```bash
cd d:\ngmo\Group_project4_PMNM\backend
```

### 1.2. Install dependencies (lần đầu tiên)
```bash
npm install
```

**Packages được cài:**
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- cookie-parser

### 1.3. Lấy MongoDB Atlas Connection String

**Bước 1: Đăng nhập MongoDB Atlas**
1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Đăng nhập vào account của bạn

**Bước 2: Lấy Connection String**
1. Click vào **"Connect"** ở cluster của bạn
2. Chọn **"Connect your application"**
3. Chọn **Driver**: Node.js, **Version**: 4.1 or later
4. Copy **Connection String**, ví dụ:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

**Bước 3: Lưu ý quan trọng**
- Thay `<username>` bằng database username của bạn
- Thay `<password>` bằng database password (không phải password MongoDB Atlas account)
- Có thể thêm database name vào sau `.net/`: `.net/user_management?retryWrites=true`

### 1.4. Tạo file .env
Tạo file `.env` trong thư mục `backend/`:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/user_management?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here_change_in_production
```

**Ví dụ thực tế:**
```env
PORT=5000
MONGO_URI=mongodb+srv://admin:MyPass123@cluster0.abcde.mongodb.net/user_management?retryWrites=true&w=majority
JWT_SECRET=my_random_secret_key_12345
```

**Lưu ý:**
- ✅ Sử dụng connection string từ MongoDB Atlas
- ✅ Đảm bảo password không có ký tự đặc biệt, hoặc encode nếu có
- ✅ Thay `JWT_SECRET` bằng chuỗi random phức tạp
- ❌ Không share file .env lên Git (đã có trong .gitignore)

### 1.5. Start Backend Server
```bash
# Trong thư mục backend/
node server.js

# Hoặc dùng nodemon (nếu có)
npm run dev
```

**Kết quả mong đợi:**
```
🚀 Server running on port 5000
✅ MongoDB connected
Registered API routes:
POST /api/signup
POST /api/login
POST /api/logout
GET /api/profile
PUT /api/profile
GET /api/users
GET /api/users/:id
DELETE /api/users/:id
PUT /api/users/:id/role
```

**Nếu gặp lỗi kết nối MongoDB Atlas:**
- Check connection string trong `.env` đúng chưa
- Check username/password đúng chưa
- Check IP Address đã được whitelist chưa (Atlas → Network Access → Add IP Address → Allow Access from Anywhere: `0.0.0.0/0`)

✅ Backend ready tại: `http://localhost:5000`

---

## 🎨 BƯỚC 2: Setup Frontend

### 2.1. Mở terminal mới
**Quan trọng:** Giữ terminal backend chạy, mở terminal MỚI

### 2.2. Navigate to frontend folder
```bash
cd d:\ngmo\Group_project4_PMNM\frontend
```

### 2.3. Install dependencies (lần đầu tiên)
```bash
npm install
```

**Packages được cài:**
- react
- react-dom
- react-router-dom
- axios
- react-scripts

### 2.4. Start Frontend Development Server
```bash
npm start
```

**Kết quả mong đợi:**
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ Frontend ready tại: `http://localhost:3000`

Browser sẽ tự động mở `http://localhost:3000`

---

## 👤 BƯỚC 3: Tạo Admin Account

### Option 1: MongoDB Atlas Web Interface (Khuyên dùng - Dễ nhất)

1. Truy cập: https://cloud.mongodb.com
2. Đăng nhập vào account của bạn
3. Click vào **"Browse Collections"**
4. Select database: `user_management`
5. Select collection: `users`
6. Đăng ký 1 user thông thường trước (qua UI `http://localhost:3000/signup`)
7. Tìm user vừa tạo trong danh sách
8. Click **biểu tượng Edit** (bút chì)
9. Thêm/Sửa field `role`:
   ```json
   "role": "admin"
   ```
10. Click **"Update"**
11. Verify: Reload page, check field `role` = "admin"

### Option 2: MongoDB Shell (Atlas Cloud)

```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/user_management" --apiVersion 1 --username your_username

# Nhập password khi được hỏi

# Đăng ký 1 user thông thường trước (qua UI hoặc API)
# Sau đó promote thành admin:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)

# Verify
db.users.findOne({ email: "admin@example.com" })
# Should see: role: "admin"
```

### Option 3: MongoDB Compass (GUI)

1. Mở **MongoDB Compass**
2. Connect using connection string từ Atlas:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
   ```
3. Select database: `user_management`
4. Select collection: `users`
5. Tìm user muốn promote
6. Click Edit Document (biểu tượng bút chì)
7. Thêm/Sửa field:
   ```json
   "role": "admin"
   ```
8. Click Update

### Option 3: Qua API (Temporary)

**Bước 1:** Sửa file `backend/controllers/authController.js`

Tìm function `signup`, tạm thời thêm:
```javascript
const newUser = new User({
  name,
  email,
  password: hashedPassword,
  role: "admin"  // ← Thêm dòng này
});
```

**Bước 2:** Đăng ký account mới qua UI

**Bước 3:** XÓA dòng code vừa thêm, restart backend

---

## 🎯 BƯỚC 4: Sử dụng hệ thống

### 4.1. Đăng ký tài khoản (User thường)

1. Truy cập: `http://localhost:3000/signup`
2. Nhập thông tin:
   - Name: `Test User`
   - Email: `user@example.com`
   - Password: `password123`
3. Click "Đăng ký"
4. Thấy thông báo "Signup successful!"

### 4.2. Đăng nhập

1. Truy cập: `http://localhost:3000/login`
2. Nhập:
   - Email: `user@example.com`
   - Password: `password123`
3. Click "Đăng nhập"
4. Redirect về Home page

### 4.3. Xem Profile

1. Click nút **"Profile"** trên Navbar
2. Xem thông tin cá nhân:
   - Avatar
   - Name
   - Email
   - Member Since

### 4.4. Cập nhật Profile

**Sửa thông tin:**
1. Trong Profile page, click **"Edit Profile"**
2. Sửa Name, Email, hoặc Avatar URL
3. Click **"Save Changes"**
4. Thấy "Profile updated successfully!"

**Đổi mật khẩu:**
1. Click **"Change Password"**
2. Nhập:
   - Current Password
   - New Password (min 6 chars)
   - Confirm New Password
3. Click **"Change Password"**
4. Thấy "Password changed successfully!"

### 4.5. Admin Panel (Chỉ Admin)

**Đăng nhập với Admin account:**
1. Login với account đã promote thành admin
2. Thấy badge **(Admin)** bên cạnh tên
3. Thấy nút **"Admin Panel"** (màu vàng)

**Truy cập Admin Panel:**
1. Click **"Admin Panel"**
2. Hoặc truy cập: `http://localhost:3000/admin`

**Quản lý Users:**
- **Xem danh sách:** Tất cả users + statistics
- **Change Role:** Click "Change Role" → Select User/Admin → Save
- **Delete User:** Click "Delete" → Confirm

**Lưu ý:**
- ❌ Admin không xóa được chính mình
- ❌ Không xóa được admin cuối cùng
- ❌ Không đổi được role của chính mình

---

## 📁 Cấu trúc thư mục

```
Group_project4_PMNM/
├── backend/
│   ├── controllers/
│   │   ├── authController.js        (Signup, Login, Logout)
│   │   └── userController.js        (Profile, Admin functions)
│   ├── middleware/
│   │   ├── authMiddleware.js        (JWT authentication)
│   │   └── roleMiddleware.js        (RBAC authorization)
│   ├── models/
│   │   └── User.js                  (User schema với role)
│   ├── routes/
│   │   └── index.js                 (All API routes)
│   ├── .env                         (Environment variables)
│   ├── server.js                    (Main server file)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx            (Login page)
│   │   │   ├── Signup.jsx           (Signup page)
│   │   │   ├── Profile.jsx          (Profile management)
│   │   │   ├── AdminPanel.jsx       (Admin user management)
│   │   │   ├── Home.jsx             (Home page)
│   │   │   ├── Navbar.jsx           (Navigation)
│   │   │   └── ProtectedRoute.jsx   (Route protection)
│   │   ├── context/
│   │   │   └── AuthContext.js       (Auth state management)
│   │   ├── services/
│   │   │   └── api.js               (API calls)
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Profile.css
│   │   │   ├── AdminPanel.css
│   │   │   └── Navbar.css
│   │   ├── App.jsx                  (Main app component)
│   │   └── index.js                 (Entry point)
│   └── package.json
│
└── Documentation files...
```

---

## 🔗 API Endpoints

### Authentication
```
POST   /api/signup              Đăng ký tài khoản mới
POST   /api/login               Đăng nhập
POST   /api/logout              Đăng xuất
```

### Profile (Authenticated)
```
GET    /api/profile             Lấy thông tin profile
PUT    /api/profile             Cập nhật profile/password
```

### Admin (Admin only)
```
GET    /api/users               Lấy danh sách users
GET    /api/users/:id           Lấy thông tin 1 user
DELETE /api/users/:id           Xóa user
PUT    /api/users/:id/role      Cập nhật role user
```

---

## 🧪 Testing

### Test Authentication
```
1. Signup new account
2. Login with credentials
3. Verify token saved in localStorage
4. Logout
5. Verify redirect to login
```

### Test Profile
```
1. Login
2. Go to Profile
3. Update name → Save → Verify
4. Update email → Save → Verify
5. Change password → Logout → Login with new password
```

### Test Admin Panel
```
1. Login as admin
2. Verify "(Admin)" badge shows
3. Click "Admin Panel"
4. View user list
5. Change user role → Verify
6. Try delete user → Verify
7. Try change own role → Should fail
8. Try delete last admin → Should fail
```

---

## 🐛 Troubleshooting

### ❌ Backend không start

**Lỗi: "Cannot find module"**
```bash
# Fix: Cài lại dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Lỗi: "MongoDB connection error" (Atlas)**
```bash
# Fix 1: Check MONGO_URI trong .env
# Phải là connection string từ MongoDB Atlas:
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/user_management?retryWrites=true&w=majority

# Fix 2: Check username/password đúng chưa
# Password là database user password (tạo trong Database Access)

# Fix 3: Whitelist IP Address
# Vào MongoDB Atlas → Network Access → Add IP Address
# Chọn "Allow Access from Anywhere" → Add 0.0.0.0/0

# Fix 4: Check cluster có đang running không
# Vào MongoDB Atlas → Clusters → Check status
```

**Lỗi: "Port 5000 already in use"**
```bash
# Fix: Đổi port trong .env
PORT=5001
```

### ❌ Frontend không start

**Lỗi: "Cannot find module"**
```bash
# Fix: Cài lại dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Lỗi: "Port 3000 already in use"**
```bash
# Fix: Kill process hoặc dùng port khác
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Hoặc set port khác
set PORT=3001 && npm start
```

### ❌ Login không thành công

**Lỗi: "Invalid credentials"**
- Check email/password đúng chưa
- Check user đã được tạo trong database chưa
- Check backend logs

**Lỗi: "Network Error"**
- Check backend có đang chạy không
- Check URL trong `frontend/src/services/api.js`:
  ```javascript
  const API_BASE_URL = "http://localhost:5000/api";
  ```

### ❌ Admin Panel - "Access Denied"

**Nguyên nhân:** User không phải admin

**Fix:**
```bash
# Check role trong MongoDB
mongosh
use user_management
db.users.findOne({ email: "your@email.com" })

# Update nếu cần
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)

# Logout và login lại
```

### ❌ CORS Error

**Lỗi trong console:** "Access to XMLHttpRequest blocked by CORS"

**Fix:** Check `backend/server.js`:
```javascript
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
```

---

## 💡 Tips & Best Practices

### 1. Development Workflow
```bash
# Terminal 1: MongoDB
mongod

# Terminal 2: Backend
cd backend
npm run dev

# Terminal 3: Frontend  
cd frontend
npm start
```

### 2. Debugging
```javascript
// Backend: Add console.log
console.log("User:", req.user);
console.log("Body:", req.body);

// Frontend: Check console
console.log("User from context:", user);
console.log("Token:", localStorage.getItem("token"));
```

### 3. Database Management (MongoDB Atlas)

**Option 1: Web Interface (Dễ nhất)**
```
1. Truy cập: https://cloud.mongodb.com
2. Click "Browse Collections"
3. Chọn database: user_management
4. Chọn collection: users
5. Thao tác trực tiếp trên giao diện
```

**Option 2: MongoDB Shell**
```bash
# Connect to Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/user_management" --username your_username

# View all users
db.users.find().pretty()

# Clear all users
db.users.deleteMany({})

# Create admin directly
db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", // hashed password
  role: "admin",
  avatar: "",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### 4. Production Deployment
```bash
# Frontend build
cd frontend
npm run build

# Backend
# - Update .env với production values
# - Use process manager (PM2)
npm install -g pm2
pm2 start server.js --name "user-management-api"
```

---

## 📚 Documentation Files

Tham khảo các file documentation chi tiết:

1. **PROFILE_API_DOCUMENTATION.md** - API Profile docs
2. **PROFILE_FRONTEND_DOCUMENTATION.md** - Profile component docs
3. **ADMIN_RBAC_DOCUMENTATION.md** - Admin & RBAC docs
4. **ADMIN_QUICK_START.md** - Admin quick guide
5. **POSTMAN_TEST_GUIDE.md** - API testing guide

---

## ✅ Checklist hoàn chỉnh

### Setup
- [ ] Node.js installed
- [ ] MongoDB installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file created

### Backend
- [ ] MongoDB running
- [ ] Backend server running on port 5000
- [ ] All API routes registered
- [ ] MongoDB connected

### Frontend
- [ ] Frontend running on port 3000
- [ ] Can access login page
- [ ] Can access signup page

### Features
- [ ] Signup works
- [ ] Login works
- [ ] Profile view works
- [ ] Profile update works
- [ ] Password change works
- [ ] Admin panel accessible (for admin)
- [ ] User management works (for admin)

### Testing
- [ ] Regular user flow tested
- [ ] Admin user flow tested
- [ ] All CRUD operations tested
- [ ] Error handling tested

---

## 🚀 Quick Start Commands

```bash
# 1. Đảm bảo đã setup .env với MongoDB Atlas connection string

# 2. Start Backend (Terminal 1)
cd d:\ngmo\Group_project4_PMNM\backend
node server.js

# 3. Start Frontend (Terminal 2)
cd d:\ngmo\Group_project4_PMNM\frontend
npm start

# 4. Access app
# Open browser: http://localhost:3000

# 5. Tạo admin user
# - Signup qua UI
# - Vào MongoDB Atlas web → Browse Collections
# - Sửa field "role" thành "admin"
# - Logout và login lại
```

---

## 🎯 Default Credentials (sau khi tạo)

```
Regular User:
Email: user@example.com
Password: password123

Admin User:
Email: admin@example.com  
Password: password123
Role: admin (phải set trong MongoDB)
```

---

**🎉 Chúc bạn thành công!**

Nếu gặp vấn đề, check phần Troubleshooting hoặc xem documentation chi tiết.

**Date**: November 9, 2025
