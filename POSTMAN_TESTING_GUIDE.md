# 📮 HƯỚNG DẪN TEST API VỚI POSTMAN

## 📥 Import Postman Collection

1. Mở Postman
2. Click **Import** → **Choose Files**
3. Chọn file: `PMNM_Complete_API.postman_collection.json`
4. Click **Import**

---

## ⚙️ Cấu hình Environment

### Tạo Environment mới:
1. Click **Environments** (bên trái)
2. Click **+** (Create Environment)
3. Tên: `PMNM Local`
4. Thêm variables:

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| `baseUrl` | `http://localhost:5000` | `http://localhost:5000` |
| `token` | | (để trống - tự động set sau khi login) |

5. Click **Save**
6. Chọn environment **PMNM Local** ở góc trên bên phải

---

## 🧪 TEST FLOW THEO THỨ TỰ:

### 1️⃣ AUTHENTICATION

#### A. Signup (Đăng ký)
**Request:**
```
POST {{baseUrl}}/api/signup
Content-Type: application/json

{
  "name": "Nguyen Van A",
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

**Expected Response (201):**
```json
{
  "message": "Signup successful!"
}
```

---

#### B. Login (Đăng nhập)
**Request:**
```
POST {{baseUrl}}/api/login
Content-Type: application/json

{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

**⚠️ Lưu ý:** Token tự động lưu vào environment variable `{{token}}` (nhờ script test)

---

### 2️⃣ PASSWORD RESET

#### A. Forgot Password
**Request:**
```
POST {{baseUrl}}/api/forgot-password
Content-Type: application/json

{
  "email": "nguyenvana@example.com"
}
```

**Expected Response (200):**
```json
{
  "message": "Password reset link has been sent to your email"
}
```

**🧪 TEST MODE:**
- Nếu `EMAIL_TEST_MODE=true` trong `.env`
- Token sẽ hiện trong **backend console** thay vì email
- Copy token từ console

**📧 PRODUCTION MODE:**
- Nếu `EMAIL_TEST_MODE=false`
- Check email inbox
- Click link hoặc copy token từ URL

---

#### B. Reset Password
**Request:**
```
POST {{baseUrl}}/api/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword456"
}
```

**⚠️ Thay `:token` bằng token thật từ email hoặc console**

**Expected Response (200):**
```json
{
  "message": "Password has been reset successfully"
}
```

**Test:**
- Login lại với password mới → Success ✅

---

### 3️⃣ USER PROFILE

#### A. Get Profile
**Request:**
```
GET {{baseUrl}}/api/profile
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

---

#### B. Update Profile
**Request:**
```
PUT {{baseUrl}}/api/profile
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Nguyen Van A Updated",
  "email": "newemail@example.com",
  "currentPassword": "newpassword456",
  "newPassword": "password789"
}
```

**Expected Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A Updated",
    "email": "newemail@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

---

### 4️⃣ UPLOAD AVATAR (Cloudinary)

#### A. Upload Avatar
**Request:**
```
POST {{baseUrl}}/api/upload-avatar
Authorization: Bearer {{token}}
Content-Type: multipart/form-data

Body (form-data):
- Key: avatar
- Type: File
- Value: [Select image file]
```

**Cách test trong Postman:**
1. Chọn **Body** → **form-data**
2. Key: `avatar`
3. Type: **File** (dropdown)
4. Value: Click **Select Files** → chọn ảnh (JPEG, PNG, GIF, WEBP, max 5MB)
5. Click **Send**

**Expected Response (200):**
```json
{
  "message": "Avatar uploaded successfully",
  "avatar": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/avatars/abc123.jpg",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": "https://res.cloudinary.com/your-cloud/image/upload/..."
  }
}
```

---

#### B. Delete Avatar
**Request:**
```
DELETE {{baseUrl}}/api/delete-avatar
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "message": "Avatar deleted successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

---

### 5️⃣ ADMIN FUNCTIONS

**⚠️ Yêu cầu:** User phải có role = `admin`

#### A. Get All Users
**Request:**
```
GET {{baseUrl}}/api/users
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "users": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Nguyen Van A",
      "email": "nguyenvana@example.com",
      "role": "user",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "avatar": "",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

#### B. Get User By ID
**Request:**
```
GET {{baseUrl}}/api/users/:id
Authorization: Bearer {{token}}
```

**Thay `:id` bằng user ID thật**

**Expected Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "user",
    "avatar": "",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### C. Delete User
**Request:**
```
DELETE {{baseUrl}}/api/users/:id
Authorization: Bearer {{token}}
```

**Expected Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

---

#### D. Update User Role
**Request:**
```
PUT {{baseUrl}}/api/users/:id/role
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "role": "admin"
}
```

**Expected Response (200):**
```json
{
  "message": "User role updated successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Nguyen Van A",
    "email": "nguyenvana@example.com",
    "role": "admin",
    "avatar": ""
  }
}
```

---

## 🔧 SETUP CLOUDINARY

### Bước 1: Tạo tài khoản Cloudinary
1. Truy cập: https://cloudinary.com/users/register_free
2. Đăng ký free account
3. Xác nhận email

### Bước 2: Lấy credentials
1. Login vào Dashboard: https://cloudinary.com/console
2. Copy thông tin:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Bước 3: Cập nhật `.env`
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Bước 4: Restart backend
```bash
cd backend
node server.js
```

---

## 🐛 TROUBLESHOOTING

### ❌ Lỗi 401 Unauthorized
**Nguyên nhân:** Token không hợp lệ hoặc hết hạn

**Giải pháp:**
1. Login lại để lấy token mới
2. Kiểm tra environment có chọn đúng không
3. Kiểm tra token có được set vào `{{token}}` variable

---

### ❌ Lỗi 403 Forbidden
**Nguyên nhân:** Không đủ quyền (cần admin role)

**Giải pháp:**
1. Tạo admin user bằng script:
```bash
cd backend
node scripts/createAdmin.js
```
2. Hoặc promote user hiện tại:
```bash
node scripts/promoteUserToAdmin.js
```

---

### ❌ Upload Avatar lỗi
**Nguyên nhân:** Cloudinary chưa cấu hình

**Giải pháp:**
1. Check `.env` có đủ 3 biến Cloudinary
2. Restart backend sau khi cập nhật `.env`
3. Test lại

---

### ❌ Forgot Password không gửi email
**Nguyên nhân:** Gmail App Password chưa đúng

**Giải pháp:**
- **Test mode:** Set `EMAIL_TEST_MODE=true` → Token log ra console
- **Production:** Tạo Gmail App Password đúng cách

---

## 📊 TEST CHECKLIST

### Authentication:
- [ ] Signup với email mới
- [ ] Login với credentials vừa tạo
- [ ] Logout

### Password Reset:
- [ ] Forgot password → nhận email/console log token
- [ ] Reset password với token
- [ ] Login với password mới

### Profile:
- [ ] Get profile
- [ ] Update name
- [ ] Update email
- [ ] Change password

### Upload Avatar:
- [ ] Upload ảnh JPEG
- [ ] Upload ảnh PNG
- [ ] Kiểm tra URL Cloudinary
- [ ] Delete avatar

### Admin Functions:
- [ ] Get all users
- [ ] Get user by ID
- [ ] Update user role
- [ ] Delete user

---

## 📝 NOTES

**File size limit:** 5MB

**Image formats:** JPEG, JPG, PNG, GIF, WEBP

**Token expiration:** 1 day (JWT)

**Reset token expiration:** 1 hour

**Cloudinary transformation:** 500x500px, auto quality, auto format

---

**Author:** PMNM Team  
**Date:** 2024  
**Version:** 1.0
