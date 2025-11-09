# 🔍 DEBUG: Admin Panel không hiển thị danh sách users

## 📋 Các bước debug:

### BƯỚC 1: Kiểm tra localStorage

Mở **Chrome DevTools** (`F12`) → Tab **Console** → Chạy:

```javascript
console.log("User:", JSON.parse(localStorage.getItem("user")));
console.log("Token:", localStorage.getItem("token"));
```

**Kết quả mong đợi:**
```javascript
User: {
  id: "...",
  name: "...",
  email: "...",
  role: "admin",  // ← PHẢI CÓ VÀ = "admin"
  avatar: "..."
}
Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // ← Phải có token
```

**❌ Nếu `role` không phải "admin" hoặc không có:**
1. Clear localStorage:
   ```javascript
   localStorage.clear();
   location.reload();
   ```
2. Logout
3. Vào MongoDB Atlas → Sửa user → Set `role: "admin"`
4. Login lại

---

### BƯỚC 2: Kiểm tra console logs khi vào Admin Panel

1. Vào trang `/admin`
2. Mở DevTools Console
3. Tìm các logs sau:

**ProtectedRoute logs:**
```
🛡️ ProtectedRoute check: {
  isAuthenticated: true,
  loading: false,
  user: { id, name, email, role: "admin", avatar },
  adminOnly: true,
  userRole: "admin"
}
✅ Access granted
```

**AdminPanel logs:**
```
🔍 Fetching users...
📝 Current user: { id, name, email, role: "admin", avatar }
🔑 Token: eyJ...
📦 Response from API: { success: true, count: 8, data: [...] }
✅ Users data: [array of users]
```

**❌ Nếu thấy:**
```
⚠️ Access denied - not admin. User role: user
```
→ User chưa phải admin, cần promote trong MongoDB

**❌ Nếu thấy:**
```
❌ Fetch users error: Error: Request failed with status code 403
❌ Error response: { data: { message: "Access denied" } }
```
→ Token không có `role: "admin"`, cần logout và login lại

**❌ Nếu thấy:**
```
❌ Fetch users error: Error: Network Error
```
→ Backend không chạy hoặc CORS error

---

### BƯỚC 3: Kiểm tra Network tab

1. Mở DevTools → Tab **Network**
2. Reload trang `/admin`
3. Tìm request: `GET http://localhost:5000/api/users`

**Request Headers - Phải có:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response - Mong đợi:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "name": "...",
      "email": "...",
      "role": "admin" | "user",
      "avatar": "",
      "createdAt": "...",
      "updatedAt": "..."
    },
    ...
  ]
}
```

**❌ Nếu Status Code = 401:**
→ Token không hợp lệ hoặc hết hạn → Logout và login lại

**❌ Nếu Status Code = 403:**
→ User không có quyền admin → Check role trong token

**❌ Nếu không thấy request:**
→ Component không gọi API → Check code

---

### BƯỚC 4: Test trực tiếp API bằng Postman/Thunder Client

**Request:**
```
GET http://localhost:5000/api/users
Headers:
  Authorization: Bearer <your_token_here>
```

**Lấy token:**
```javascript
// Trong DevTools Console:
console.log(localStorage.getItem("token"));
// Copy token
```

**Test:**
1. Paste token vào Authorization header
2. Send request
3. Check response

**✅ Nếu response OK:**
→ Vấn đề ở frontend

**❌ Nếu 403 Forbidden:**
→ Token không có role admin → Check JWT payload:
```javascript
// Decode token (paste vào https://jwt.io)
// Check payload có:
{
  "id": "...",
  "role": "admin",  // ← PHẢI CÓ
  "iat": ...,
  "exp": ...
}
```

---

### BƯỚC 5: Kiểm tra backend có chạy không

**Terminal backend phải hiển thị:**
```
🚀 Server running on port 5000
✅ MongoDB connected
```

**Test:**
```bash
# Trong PowerShell hoặc Terminal mới:
curl http://localhost:5000/api/users
```

**Hoặc:**
Mở browser: `http://localhost:5000/api/users`

**❌ Nếu không connect được:**
→ Backend không chạy → Chạy lại `node server.js`

---

## ✅ GIẢI PHÁP NHANH

### Solution 1: Clear và Login lại (90% fix được)

```javascript
// DevTools Console:
localStorage.clear();
location.reload();

// Sau đó:
// 1. Login với admin account
// 2. Vào /admin
```

### Solution 2: Promote user thành admin

**MongoDB Atlas Web:**
1. https://cloud.mongodb.com
2. Browse Collections
3. Database: `user_management`
4. Collection: `users`
5. Tìm user của bạn
6. Edit → `role: "admin"`
7. Update

**Sau đó:**
- Logout
- Login lại
- Vào /admin

### Solution 3: Tạo admin mới từ đầu

**Backend terminal:**
```bash
cd backend
node scripts/updateUsersWithRole.js
```

**Hoặc chạy script tạo admin:**

Tạo file `backend/scripts/createAdmin.js`:
```javascript
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("❌ Admin already exists:", adminEmail);
      await mongoose.disconnect();
      return;
    }

    // Create admin
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = new User({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
      avatar: ""
    });

    await admin.save();
    console.log("✅ Admin created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error);
  }
};

createAdmin();
```

**Chạy:**
```bash
node scripts/createAdmin.js
```

**Login:**
- Email: `admin@example.com`
- Password: `admin123`

---

## 📊 Checklist Debug

- [ ] localStorage có user với `role: "admin"`
- [ ] localStorage có token
- [ ] ProtectedRoute log "Access granted"
- [ ] AdminPanel log "Fetching users"
- [ ] Network tab có request GET /api/users
- [ ] Request có Authorization header
- [ ] Response status = 200
- [ ] Response có `success: true` và `data: [...]`
- [ ] Backend đang chạy
- [ ] MongoDB Atlas connected

---

## 🚨 Common Issues

### Issue 1: "Access Denied" hiển thị
**Nguyên nhân:** `user.role !== "admin"`

**Fix:**
```javascript
// Check role:
console.log(JSON.parse(localStorage.getItem("user")).role);

// Nếu không phải "admin":
// 1. Vào MongoDB → Set role = "admin"
// 2. Logout
// 3. Login lại
```

### Issue 2: Danh sách rỗng (không có users)
**Nguyên nhân:** `response.data` empty hoặc API error

**Fix:**
```javascript
// Check console logs:
// - "📦 Response from API"
// - "✅ Users data"

// Nếu không thấy logs → Component không mount
// Nếu data empty → Database không có users
```

### Issue 3: Network Error
**Nguyên nhân:** Backend không chạy hoặc CORS

**Fix:**
```bash
# Restart backend:
cd backend
node server.js

# Check CORS trong server.js:
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
```

### Issue 4: 403 Forbidden
**Nguyên nhân:** Token không có `role: "admin"` trong payload

**Fix:**
```javascript
// 1. Copy token:
console.log(localStorage.getItem("token"));

// 2. Decode tại https://jwt.io
// 3. Check payload có "role": "admin" không
// 4. Nếu không có → Logout và login lại
```

---

## 📞 Gửi thông tin debug

Nếu vẫn không fix được, gửi cho tôi:

1. **localStorage data:**
```javascript
console.log("User:", JSON.parse(localStorage.getItem("user")));
console.log("Token:", localStorage.getItem("token"));
```

2. **Console logs** (screenshot hoặc copy)

3. **Network tab** - Response của GET /api/users (screenshot)

4. **Decoded JWT** từ https://jwt.io (screenshot payload)

---

**Date:** November 9, 2025
