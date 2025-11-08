# Profile API Documentation

## Overview
API endpoints để quản lý thông tin profile của người dùng.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Tất cả các endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. GET /profile
Lấy thông tin profile của người dùng hiện tại.

#### Request
```http
GET /api/profile
Authorization: Bearer <jwt_token>
```

#### Response Success (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

#### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "User not found"
}
```

#### Response Error (401 Unauthorized)
```json
{
  "message": "No token provided"
}
```

#### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Server error while fetching profile"
}
```

---

### 2. PUT /profile
Cập nhật thông tin profile của người dùng.

#### Request
```http
PUT /api/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "name": "Nguyễn Văn B",
  "email": "newemail@example.com",
  "avatar": "https://example.com/new-avatar.jpg",
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

**Lưu ý:**
- Tất cả các trường đều **optional**
- `currentPassword` là **bắt buộc** khi muốn đổi mật khẩu
- Email phải unique trong hệ thống
- Password mới phải có ít nhất 6 ký tự

#### Response Success (200 OK)
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Nguyễn Văn B",
    "email": "newemail@example.com",
    "avatar": "https://example.com/new-avatar.jpg",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z"
  }
}
```

#### Response Error (400 Bad Request)
```json
{
  "success": false,
  "message": "Name cannot be empty"
}
```

```json
{
  "success": false,
  "message": "Invalid email format"
}
```

```json
{
  "success": false,
  "message": "Email already in use"
}
```

```json
{
  "success": false,
  "message": "Current password is required to set new password"
}
```

```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

```json
{
  "success": false,
  "message": "New password must be at least 6 characters"
}
```

#### Response Error (404 Not Found)
```json
{
  "success": false,
  "message": "User not found"
}
```

#### Response Error (500 Internal Server Error)
```json
{
  "success": false,
  "message": "Server error while updating profile"
}
```

---

## Testing với cURL

### 1. Lấy thông tin profile
```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Update tên và email
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Name",
    "email": "newemail@example.com"
  }'
```

### 3. Update avatar
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "avatar": "https://example.com/avatar.jpg"
  }'
```

### 4. Đổi mật khẩu
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "oldPassword123",
    "newPassword": "newPassword123"
  }'
```

---

## Testing với Postman

### Setup
1. Import collection vào Postman
2. Tạo environment variable:
   - `base_url`: `http://localhost:5000`
   - `token`: `<your_jwt_token>`

### GET Profile
- Method: `GET`
- URL: `{{base_url}}/api/profile`
- Headers:
  - `Authorization`: `Bearer {{token}}`

### PUT Profile
- Method: `PUT`
- URL: `{{base_url}}/api/profile`
- Headers:
  - `Authorization`: `Bearer {{token}}`
  - `Content-Type`: `application/json`
- Body (raw JSON):
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

---

## Validation Rules

### Name
- Required khi update
- Không được để trống
- Tự động trim whitespace

### Email
- Required khi update
- Phải đúng định dạng email
- Phải unique (không trùng với user khác)
- Tự động chuyển thành lowercase

### Avatar
- Optional
- Có thể là URL hoặc path

### Password
- `currentPassword` bắt buộc khi muốn đổi password
- `newPassword` phải có ít nhất 6 ký tự
- Password được hash bằng bcrypt trước khi lưu

---

## Error Codes

| Status Code | Description |
|------------|-------------|
| 200 | Success |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no token hoặc invalid token) |
| 404 | User not found |
| 500 | Internal Server Error |

---

## Implementation Details

### File Structure
```
backend/
├── controllers/
│   └── userController.js    # Contains getProfile & updateProfile
├── middleware/
│   └── authMiddleware.js    # JWT authentication
├── models/
│   └── User.js              # User schema
└── routes/
    └── index.js             # Route definitions
```

### Security Features
- JWT authentication required
- Password verification before changing
- Email uniqueness check
- Input validation and sanitization
- Password hashing with bcrypt
- Sensitive data (password, __v) excluded from responses

### Database Fields
```javascript
{
  name: String,          // Required
  email: String,         // Required, Unique
  password: String,      // Required, Hashed
  avatar: String,        // Optional, Default: ""
  createdAt: Date,       // Auto-generated
  updatedAt: Date        // Auto-updated
}
```
