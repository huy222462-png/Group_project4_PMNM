# 🧪 HƯỚNG DẪN TEST PROFILE API VỚI POSTMAN

## 📋 Các địa chỉ API endpoints:

### Base URL
```
http://localhost:5000/api
```

### Endpoints Profile API
```
GET  http://localhost:5000/api/profile   (Lấy thông tin profile)
PUT  http://localhost:5000/api/profile   (Cập nhật profile)
```

### Endpoints Authentication (để lấy token)
```
POST http://localhost:5000/api/signup    (Đăng ký)
POST http://localhost:5000/api/login     (Đăng nhập - lấy token)
POST http://localhost:5000/api/logout    (Đăng xuất)
```

---

## 🚀 CÁCH 1: Test Manual với Postman

### Bước 1: Đăng ký tài khoản (nếu chưa có)

**Request:**
```
Method: POST
URL: http://localhost:5000/api/signup
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Signup successful!"
}
```

---

### Bước 2: Đăng nhập để lấy TOKEN

**Request:**
```
Method: POST
URL: http://localhost:5000/api/login
Headers:
  Content-Type: application/json
Body (raw JSON):
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**⚠️ QUAN TRỌNG: Copy token này để dùng cho các request tiếp theo!**

---

### Bước 3: GET Profile (Lấy thông tin profile)

**Request:**
```
Method: GET
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN_TỪ_BƯỚC_2>
```

**Cách thêm Authorization header trong Postman:**
1. Chọn tab "Authorization"
2. Type: chọn "Bearer Token"
3. Token: paste token từ bước 2 (không cần thêm chữ "Bearer")

HOẶC

1. Chọn tab "Headers"
2. Key: `Authorization`
3. Value: `Bearer <paste_token_ở_đây>`

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "673e12345678901234567890",
    "name": "Test User",
    "email": "testuser@example.com",
    "avatar": "",
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:00:00.000Z"
  }
}
```

---

### Bước 4: PUT Profile - Update Name

**Request:**
```
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Updated Name"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "673e12345678901234567890",
    "name": "Updated Name",
    "email": "testuser@example.com",
    "avatar": "",
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:05:00.000Z"
  }
}
```

---

### Bước 5: PUT Profile - Update Email

**Request:**
```
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
Body (raw JSON):
{
  "email": "newemail@example.com"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "673e12345678901234567890",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "avatar": "",
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:10:00.000Z"
  }
}
```

---

### Bước 6: PUT Profile - Update Avatar

**Request:**
```
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
Body (raw JSON):
{
  "avatar": "https://example.com/avatar.jpg"
}
```

---

### Bước 7: PUT Profile - Change Password

**Request:**
```
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
Body (raw JSON):
{
  "currentPassword": "password123",
  "newPassword": "newPassword123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "673e12345678901234567890",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2025-11-08T10:00:00.000Z",
    "updatedAt": "2025-11-08T10:15:00.000Z"
  }
}
```

---

### Bước 8: PUT Profile - Update Multiple Fields

**Request:**
```
Method: PUT
URL: http://localhost:5000/api/profile
Headers:
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
Body (raw JSON):
{
  "name": "Complete Update",
  "email": "complete@example.com",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

---

## 🚀 CÁCH 2: Import Postman Collection (KHUYÊN DÙNG)

### Bước 1: Import Collection
1. Mở Postman
2. Click **"Import"** (góc trên bên trái)
3. Chọn file `Profile_API.postman_collection.json` trong thư mục `backend/`
4. Click **"Import"**

### Bước 2: Sử dụng
1. Chạy request **"Login"** trong folder **"Auth"**
   - Token sẽ tự động được save vào biến `{{token}}`
2. Chạy các request khác trong folder **"Profile"**
   - Token sẽ tự động được thêm vào header

### Lợi ích:
✅ Token tự động được save sau khi login
✅ Không cần copy/paste token thủ công
✅ Có sẵn nhiều test cases
✅ Có cả error cases để test validation

---

## 📋 CHECKLIST TEST

### ✅ Success Cases
- [ ] GET /profile - Lấy thông tin profile
- [ ] PUT /profile - Update name
- [ ] PUT /profile - Update email
- [ ] PUT /profile - Update avatar
- [ ] PUT /profile - Change password
- [ ] PUT /profile - Update multiple fields

### ✅ Error Cases
- [ ] GET /profile - Không có token (401)
- [ ] GET /profile - Token invalid (401)
- [ ] PUT /profile - Name empty (400)
- [ ] PUT /profile - Email invalid format (400)
- [ ] PUT /profile - Email already in use (400)
- [ ] PUT /profile - Wrong current password (400)
- [ ] PUT /profile - New password too short (400)

---

## ⚠️ LƯU Ý QUAN TRỌNG

### 1. Server phải đang chạy
```bash
cd backend
npm run dev
```
Kiểm tra console có message:
```
🚀 Server running on port 5000
MongoDB connected
```

### 2. MongoDB phải đang chạy
Kiểm tra file `.env` có:
```
MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secret_key
PORT=5000
```

### 3. Token expires sau 1 ngày
Nếu lỗi "Invalid token", login lại để lấy token mới

### 4. Content-Type header
Nhớ thêm `Content-Type: application/json` cho tất cả PUT/POST requests

---

## 🐛 TROUBLESHOOTING

### Lỗi "No token provided"
**Nguyên nhân:** Thiếu Authorization header
**Giải pháp:** Thêm header `Authorization: Bearer <token>`

### Lỗi "Invalid token"
**Nguyên nhân:** Token sai hoặc hết hạn
**Giải pháp:** Login lại để lấy token mới

### Lỗi "Cannot POST/GET"
**Nguyên nhân:** URL sai hoặc server chưa chạy
**Giải pháp:** 
- Kiểm tra URL: `http://localhost:5000/api/profile`
- Kiểm tra server đang chạy

### Lỗi "Email already in use"
**Nguyên nhân:** Email đã được user khác dùng
**Giải pháp:** Dùng email khác

### Lỗi Connection refused
**Nguyên nhân:** Server chưa chạy hoặc port sai
**Giải pháp:** 
- Start server: `npm run dev`
- Kiểm tra port trong .env

---

## 📊 Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Profile retrieved/updated |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | No token, invalid token |
| 404 | Not Found | User not found |
| 500 | Server Error | Database error |

---

## 💡 TIPS

1. **Save requests**: Click "Save" sau khi tạo request để dùng lại
2. **Environment variables**: Tạo environment để lưu base_url và token
3. **Tests tab**: Viết script auto-save token:
   ```javascript
   if (pm.response.code === 200) {
       var jsonData = pm.response.json();
       pm.environment.set("token", jsonData.token);
   }
   ```
4. **Collections**: Organize requests thành folders
5. **History**: Check tab History để xem lại requests cũ

---

## 🎯 Các địa chỉ đầy đủ (Copy & Paste)

```
Signup:  POST   http://localhost:5000/api/signup
Login:   POST   http://localhost:5000/api/login
Logout:  POST   http://localhost:5000/api/logout
Profile: GET    http://localhost:5000/api/profile
Profile: PUT    http://localhost:5000/api/profile
```

---

**Chúc bạn test thành công! 🚀**
