# 🔴 FIX LỖI: Access denied: Insufficient role

## ❌ Lỗi gặp phải:
```json
{
    "message": "Access denied: Insufficient role"
}
```

---

## 🔍 NGUYÊN NHÂN:

User đang login **KHÔNG PHẢI ADMIN** hoặc token cũ không có field `role: "admin"`.

---

## ✅ GIẢI PHÁP - Làm theo thứ tự:

### **BƯỚC 1: Kiểm tra user role trong localStorage**

**Mở Chrome DevTools (F12) → Console → Chạy:**
```javascript
const user = JSON.parse(localStorage.getItem("user"));
console.log("Current user:", user);
console.log("User role:", user?.role);
```

**Kết quả:**
```javascript
Current user: { id: "...", name: "...", email: "...", role: "user", avatar: "" }
User role: "user"  // ← VẤN ĐỀ: Phải là "admin"
```

**Nếu `role: "user"` → User không phải admin**

---

### **BƯỚC 2: Promote user thành admin trong MongoDB Atlas**

#### Option 1: MongoDB Atlas Web (KHUYÊN DÙNG)

1. Truy cập: https://cloud.mongodb.com
2. Đăng nhập
3. Click **"Browse Collections"**
4. Database: `user_management`
5. Collection: `users`
6. Tìm user của bạn (theo email)
7. Click biểu tượng **Edit** (bút chì)
8. Sửa field `role`:
   ```json
   "role": "admin"
   ```
9. Click **"Update"**
10. ✅ Verify: Reload page, check `role` = `"admin"`

#### Option 2: Script tự động

**Chạy trong terminal backend:**
```bash
cd d:\ngmo\Group_project4_PMNM\backend
node scripts/updateUsersWithRole.js
```

**Sau đó promote user thành admin:**
```bash
# Tạo file scripts/promoteToAdmin.js
```

---

### **BƯỚC 3: Clear localStorage và Logout**

**DevTools Console:**
```javascript
localStorage.clear();
location.reload();
```

**Hoặc:**
- Click nút **Logout** trên Navbar
- Clear browser data

---

### **BƯỚC 4: Login lại**

1. Vào trang Login: `http://localhost:3000/login`
2. Nhập email và password của user vừa promote
3. Click "Đăng nhập"

**Kiểm tra Console logs:**
```
🔍 Login response: { token, user, message }
👤 User data: { id, name, email, role: "admin", avatar }
         ← PHẢI CÓ role: "admin"
🔑 Token: eyJ...
🔐 AuthContext.login called
✅ Saved to localStorage
```

---

### **BƯỚC 5: Verify token có role admin**

**Decode JWT token:**
1. Copy token từ localStorage:
   ```javascript
   console.log(localStorage.getItem("token"));
   ```
2. Paste vào: https://jwt.io
3. Check **Payload** section:
   ```json
   {
     "id": "673abc...",
     "role": "admin",  ← PHẢI CÓ FIELD NÀY
     "iat": 1699123456,
     "exp": 1699209856
   }
   ```

**Nếu không có `"role": "admin"` → Token cũ, cần login lại**

---

### **BƯỚC 6: Vào Admin Panel**

1. Sau khi login với admin account
2. Check Navbar → Phải thấy:
   - Badge: **(Admin)**
   - Nút: **"Admin Panel"** (màu vàng)
3. Click "Admin Panel" hoặc vào: `http://localhost:3000/admin`
4. ✅ Thấy danh sách users

---

## 🧪 TEST BẰNG POSTMAN

### **1. Login để lấy admin token**

**Request:**
```
POST http://localhost:5000/api/login
Content-Type: application/json

Body:
{
  "email": "your_admin_email@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "673abc...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",  ← CHECK FIELD NÀY
    "avatar": ""
  }
}
```

**Copy token từ response**

---

### **2. Test Get All Users với admin token**

**Request:**
```
GET http://localhost:5000/api/users
Authorization: Bearer <paste_admin_token_here>
```

**Response thành công:**
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "673abc...",
      "name": "User 1",
      "email": "user1@example.com",
      "role": "user",
      ...
    },
    ...
  ]
}
```

**Nếu vẫn lỗi 403:**
→ Token không phải admin → Check lại JWT payload

---

## 🛠️ SCRIPT NHANH: Promote user thành admin

Tạo file `backend/scripts/promoteUserToAdmin.js`:

```javascript
import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const promoteToAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("❌ User not found:", email);
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log("ℹ️  User already admin:", email);
    } else {
      user.role = "admin";
      await user.save();
      console.log("✅ User promoted to admin:", email);
    }

    await mongoose.disconnect();
    console.log("✅ Done");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

// Thay email của bạn vào đây
const emailToPromote = process.argv[2] || "your@email.com";
promoteToAdmin(emailToPromote);
```

**Chạy:**
```bash
cd backend
node scripts/promoteUserToAdmin.js "your@email.com"
```

---

## 📋 CHECKLIST

- [ ] Check `user.role` trong localStorage → Phải là `"admin"`
- [ ] Vào MongoDB Atlas → Sửa user → Set `role: "admin"`
- [ ] Clear localStorage
- [ ] Logout
- [ ] Login lại với admin account
- [ ] Check console logs → `role: "admin"` trong response
- [ ] Decode JWT token → Payload có `"role": "admin"`
- [ ] Check Navbar → Thấy "(Admin)" badge
- [ ] Click "Admin Panel" → Vào được `/admin`
- [ ] Danh sách users hiển thị

---

## 🚨 LƯU Ý QUAN TRỌNG

### ⚠️ **Token cũ không có role:**

Nếu user được promote **SAU KHI** đã login:
- Token cũ không có `role: "admin"`
- **PHẢI logout và login lại** để lấy token mới

### ⚠️ **Browser cache:**

- Clear localStorage: `localStorage.clear()`
- Hard refresh: `Ctrl + Shift + R`
- Hoặc mở Incognito mode

### ⚠️ **Multiple tabs:**

- Nếu mở nhiều tab → Logout ở tất cả tabs
- Login lại ở 1 tab mới

---

## 📞 Nếu vẫn không được

**Gửi cho tôi thông tin sau:**

1. **User trong localStorage:**
```javascript
console.log(JSON.parse(localStorage.getItem("user")));
// Copy kết quả
```

2. **JWT Token decoded:**
- Vào https://jwt.io
- Paste token
- Screenshot Payload section

3. **User trong MongoDB:**
- Screenshot user document trong MongoDB Atlas
- Check field `role`

4. **Console logs khi login:**
- Screenshot tất cả logs
- Đặc biệt log "👤 User data:"

---

**Date:** November 9, 2025
**Status:** ⚠️ WAITING FOR USER ACTION
