# 🧪 HƯỚNG DẪN TEST API VỚI POSTMAN

## 📦 Chuẩn bị

### 1. Cài đặt Postman
- Download: https://www.postman.com/downloads/
- Hoặc dùng Postman Web: https://web.postman.com

### 2. Đảm bảo Backend đang chạy
```bash
cd d:\ngmo\Group_project4_PMNM\backend
node server.js
```

**Kiểm tra:** Mở browser `http://localhost:5000` → Thấy message từ server

---

## 🔐 AUTHENTICATION APIs

### 1️⃣ SIGNUP - Đăng ký tài khoản mới

**Endpoint:**
```
POST http://localhost:5000/api/signup
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Response thành công (201):**
```json
{
  "message": "Signup successful!"
}
```

**Response lỗi (400):**
```json
{
  "message": "Email already registered"
}
```

---

### 2️⃣ LOGIN - Đăng nhập

**Endpoint:**
```
POST http://localhost:5000/api/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

**Response thành công (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M...",
  "user": {
    "id": "673abc123...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user",
    "avatar": ""
  }
}
```

**⚠️ QUAN TRỌNG:** Copy `token` từ response → Dùng cho các request sau

**Response lỗi (400):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3️⃣ LOGOUT - Đăng xuất

**Endpoint:**
```
POST http://localhost:5000/api/logout
```

**Headers:**
```
Content-Type: application/json
```

**Body:** Không cần

**Response thành công (200):**
```json
{
  "message": "Logout successful"
}
```

---

## 👤 PROFILE APIs (Yêu cầu Authentication)

### ⚠️ Lưu ý: Tất cả request dưới đây cần TOKEN

**Cách thêm Token vào Postman:**
1. Tab **Authorization**
2. Type: **Bearer Token**
3. Token: Paste token từ response login

**Hoặc thêm vào Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 4️⃣ GET PROFILE - Lấy thông tin cá nhân

**Endpoint:**
```
GET http://localhost:5000/api/profile
```

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc...",
    "name": "Test User",
    "email": "testuser@example.com",
    "role": "user",
    "avatar": "",
    "createdAt": "2025-11-09T10:30:00.000Z",
    "updatedAt": "2025-11-09T10:30:00.000Z"
  }
}
```

**Response lỗi (401):**
```json
{
  "message": "No token provided"
}
```

---

### 5️⃣ UPDATE PROFILE - Cập nhật thông tin cá nhân

**Endpoint:**
```
PUT http://localhost:5000/api/profile
```

**Headers:**
```
Authorization: Bearer <your_token_here>
Content-Type: application/json
```

**Body - Cập nhật name/email/avatar:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "avatar": "https://i.pravatar.cc/150?img=3"
}
```

**Body - Đổi mật khẩu:**
```json
{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

**Response thành công (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "673abc...",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "role": "user",
    "avatar": "https://i.pravatar.cc/150?img=3",
    "createdAt": "2025-11-09T10:30:00.000Z",
    "updatedAt": "2025-11-09T11:45:00.000Z"
  }
}
```

**Response lỗi:**
```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

---

## 👑 ADMIN APIs (Chỉ Admin)

### ⚠️ Lưu ý: Token phải từ admin account

**Cách tạo admin:**
1. Signup account thông thường
2. Vào MongoDB Atlas → Edit user → Set `role: "admin"`
3. Login lại → Copy token

---

### 6️⃣ GET ALL USERS - Lấy danh sách tất cả users

**Endpoint:**
```
GET http://localhost:5000/api/users
```

**Headers:**
```
Authorization: Bearer <admin_token_here>
```

**Response thành công (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "673abc...",
      "name": "User 1",
      "email": "user1@example.com",
      "role": "user",
      "avatar": "",
      "createdAt": "2025-11-09T10:00:00.000Z",
      "updatedAt": "2025-11-09T10:00:00.000Z"
    },
    {
      "_id": "673def...",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "avatar": "",
      "createdAt": "2025-11-09T09:00:00.000Z",
      "updatedAt": "2025-11-09T09:00:00.000Z"
    }
  ]
}
```

**Response lỗi (403):**
```json
{
  "message": "Access denied. Admin role required"
}
```

---

### 7️⃣ GET USER BY ID - Lấy thông tin 1 user

**Endpoint:**
```
GET http://localhost:5000/api/users/:userId
```

**Ví dụ:**
```
GET http://localhost:5000/api/users/673abc123456789
```

**Headers:**
```
Authorization: Bearer <admin_token_here>
```

**Response thành công (200):**
```json
{
  "success": true,
  "data": {
    "_id": "673abc...",
    "name": "User 1",
    "email": "user1@example.com",
    "role": "user",
    "avatar": "",
    "createdAt": "2025-11-09T10:00:00.000Z",
    "updatedAt": "2025-11-09T10:00:00.000Z"
  }
}
```

**Response lỗi (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 8️⃣ DELETE USER - Xóa user

**Endpoint:**
```
DELETE http://localhost:5000/api/users/:userId
```

**Ví dụ:**
```
DELETE http://localhost:5000/api/users/673abc123456789
```

**Headers:**
```
Authorization: Bearer <admin_token_here>
```

**Response thành công (200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Response lỗi - Không thể xóa chính mình:**
```json
{
  "success": false,
  "message": "You cannot delete your own account"
}
```

**Response lỗi - Không thể xóa admin cuối cùng:**
```json
{
  "success": false,
  "message": "Cannot delete the last admin user"
}
```

---

### 9️⃣ UPDATE USER ROLE - Cập nhật role user

**Endpoint:**
```
PUT http://localhost:5000/api/users/:userId/role
```

**Ví dụ:**
```
PUT http://localhost:5000/api/users/673abc123456789/role
```

**Headers:**
```
Authorization: Bearer <admin_token_here>
Content-Type: application/json
```

**Body:**
```json
{
  "role": "admin"
}
```

**Hoặc:**
```json
{
  "role": "user"
}
```

**Response thành công (200):**
```json
{
  "success": true,
  "message": "User role updated successfully",
  "data": {
    "_id": "673abc...",
    "name": "User 1",
    "email": "user1@example.com",
    "role": "admin",
    "avatar": "",
    "createdAt": "2025-11-09T10:00:00.000Z",
    "updatedAt": "2025-11-09T12:00:00.000Z"
  }
}
```

**Response lỗi - Không thể đổi role chính mình:**
```json
{
  "success": false,
  "message": "You cannot change your own role"
}
```

**Response lỗi - Không thể demote admin cuối cùng:**
```json
{
  "success": false,
  "message": "Cannot change role of the last admin user"
}
```

---

## 📚 POSTMAN COLLECTION

### Import Collection vào Postman

Tạo file `User_Management_API.postman_collection.json`:

```json
{
  "info": {
    "name": "User Management API",
    "description": "Complete API collection for User Management System",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Signup",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test User\",\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/signup",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "signup"]
            }
          }
        },
        {
          "name": "Login",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/login",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "login"]
            }
          }
        },
        {
          "name": "Logout",
          "request": {
            "method": "POST",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/api/logout",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "logout"]
            }
          }
        }
      ]
    },
    {
      "name": "Profile",
      "item": [
        {
          "name": "Get Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}",
                "type": "text"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/profile",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "profile"]
            }
          }
        },
        {
          "name": "Update Profile",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{token}}",
                "type": "text"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Updated Name\",\n  \"email\": \"updated@example.com\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/profile",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "profile"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Get All Users",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}",
                "type": "text"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/users",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "users"]
            }
          }
        },
        {
          "name": "Get User By ID",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}",
                "type": "text"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/users/:userId",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "users", ":userId"],
              "variable": [
                {
                  "key": "userId",
                  "value": "673abc123"
                }
              ]
            }
          }
        },
        {
          "name": "Delete User",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}",
                "type": "text"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/users/:userId",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "users", ":userId"],
              "variable": [
                {
                  "key": "userId",
                  "value": "673abc123"
                }
              ]
            }
          }
        },
        {
          "name": "Update User Role",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}",
                "type": "text"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"role\": \"admin\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/users/:userId/role",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "users", ":userId", "role"],
              "variable": [
                {
                  "key": "userId",
                  "value": "673abc123"
                }
              ]
            }
          }
        }
      ]
    }
  ]
}
```

**Import vào Postman:**
1. Mở Postman
2. Click **Import** (góc trên bên trái)
3. Chọn file `User_Management_API.postman_collection.json`
4. Click **Import**

---

## 🧪 TEST FLOW

### Flow 1: User thường

```
1. Signup
   POST /api/signup
   → Save response

2. Login
   POST /api/login
   → Copy token từ response

3. Get Profile
   GET /api/profile
   Headers: Authorization: Bearer <token>
   
4. Update Profile
   PUT /api/profile
   Headers: Authorization: Bearer <token>
   Body: { "name": "New Name" }

5. Change Password
   PUT /api/profile
   Headers: Authorization: Bearer <token>
   Body: { "currentPassword": "old", "newPassword": "new" }

6. Logout
   POST /api/logout
```

### Flow 2: Admin

```
1. Login as Admin
   POST /api/login
   Body: { "email": "admin@example.com", "password": "..." }
   → Copy admin token

2. Get All Users
   GET /api/users
   Headers: Authorization: Bearer <admin_token>

3. Get Specific User
   GET /api/users/673abc...
   Headers: Authorization: Bearer <admin_token>

4. Update User Role
   PUT /api/users/673abc.../role
   Headers: Authorization: Bearer <admin_token>
   Body: { "role": "admin" }

5. Delete User
   DELETE /api/users/673abc...
   Headers: Authorization: Bearer <admin_token>
```

---

## 💡 Tips

### 1. Sử dụng Environment Variables

**Tạo Environment:**
1. Click Settings icon (⚙️) → **Environments**
2. Add Environment: `Local`
3. Add variables:
   - `baseUrl`: `http://localhost:5000/api`
   - `token`: (paste token sau khi login)
   - `adminToken`: (paste admin token)

**Sử dụng:**
```
{{baseUrl}}/signup
{{baseUrl}}/login
Authorization: Bearer {{token}}
```

### 2. Auto-save token sau Login

**Tests tab trong Login request:**
```javascript
// Parse response
const response = pm.response.json();

// Save token to environment
if (response.token) {
    pm.environment.set("token", response.token);
}

// Save user info
if (response.user) {
    pm.environment.set("userId", response.user.id);
    pm.environment.set("userRole", response.user.role);
}
```

### 3. Check response trong Tests

```javascript
// Check status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Check response has success field
pm.test("Response has success field", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('success');
    pm.expect(jsonData.success).to.eql(true);
});
```

---

## 📊 Quick Reference

| Endpoint | Method | Auth | Role | Description |
|----------|--------|------|------|-------------|
| `/api/signup` | POST | ❌ | Any | Đăng ký |
| `/api/login` | POST | ❌ | Any | Đăng nhập |
| `/api/logout` | POST | ❌ | Any | Đăng xuất |
| `/api/profile` | GET | ✅ | Any | Xem profile |
| `/api/profile` | PUT | ✅ | Any | Cập nhật profile |
| `/api/users` | GET | ✅ | Admin | Danh sách users |
| `/api/users/:id` | GET | ✅ | Admin | Chi tiết user |
| `/api/users/:id` | DELETE | ✅ | Admin | Xóa user |
| `/api/users/:id/role` | PUT | ✅ | Admin | Đổi role |

---

**Date:** November 9, 2025
**Base URL:** `http://localhost:5000/api`
