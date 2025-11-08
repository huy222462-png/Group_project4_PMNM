# Profile API - Backend Implementation

## 📋 Tổng quan

API endpoints để quản lý thông tin profile của người dùng, bao gồm:
- **GET /api/profile** - Lấy thông tin profile
- **PUT /api/profile** - Cập nhật thông tin profile

## 🚀 Cài đặt và Chạy

### 1. Cài đặt dependencies
```bash
cd backend
npm install
```

### 2. Cấu hình Environment Variables
Tạo file `.env` trong thư mục `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_secret_key_here
```

### 3. Chạy Server
```bash
# Development mode với auto-reload
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## 📁 Cấu trúc File

```
backend/
├── controllers/
│   └── userController.js          # ✅ Logic xử lý GET & PUT /profile
├── middleware/
│   └── authMiddleware.js          # ✅ JWT authentication
├── models/
│   └── User.js                    # ✅ User schema
├── routes/
│   └── index.js                   # ✅ Route definitions
├── server.js                      # ✅ Main server file
├── PROFILE_API_DOCUMENTATION.md   # 📖 Chi tiết API docs
├── test-profile-api.js            # 🧪 Automated tests
└── Profile_API.postman_collection.json  # 📮 Postman collection
```

## 🔧 Implementation Details

### 1. User Model (`models/User.js`)
```javascript
{
  name: String,       // Required
  email: String,      // Required, Unique
  password: String,   // Required, Hashed
  avatar: String,     // Optional, Default: ""
  createdAt: Date,    // Auto-generated
  updatedAt: Date     // Auto-updated
}
```

### 2. Authentication Middleware (`middleware/authMiddleware.js`)
- Verify JWT token từ header `Authorization: Bearer <token>`
- Extract user ID và gán vào `req.user`
- Return 401 nếu không có token hoặc token invalid

### 3. Profile Controller (`controllers/userController.js`)

#### `getProfile(req, res)`
- Lấy thông tin user từ database dựa trên `req.user.id`
- Exclude password và `__v` từ response
- Return user object với format:
  ```json
  {
    "success": true,
    "data": { /* user data */ }
  }
  ```

#### `updateProfile(req, res)`
- Validate và update các fields:
  - `name`: Không được empty, auto trim
  - `email`: Validate format, check uniqueness, convert to lowercase
  - `avatar`: Optional URL/path
  - `password`: Require current password, validate length >= 6, hash before save
- Return updated user object

### 4. Routes (`routes/index.js`)
```javascript
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
```

## 🧪 Testing

### Option 1: Automated Test Script
```bash
# Cài axios nếu chưa có
npm install axios

# Chạy tests
node test-profile-api.js
```

Test script sẽ tự động:
- ✅ Đăng ký user mới
- ✅ Đăng nhập và lấy token
- ✅ Test GET /profile
- ✅ Test PUT /profile với nhiều scenarios
- ✅ Test error cases

### Option 2: Postman Collection
1. Import file `Profile_API.postman_collection.json` vào Postman
2. Chạy "Signup" và "Login" để lấy token (token sẽ tự động save)
3. Test các endpoints trong folder "Profile"
4. Test error cases trong folder "Error Cases"

### Option 3: cURL Commands

#### Get Profile
```bash
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Name
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'
```

#### Update Email
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"newemail@example.com"}'
```

#### Update Password
```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"old123","newPassword":"new123"}'
```

## 📝 API Endpoints

### GET /api/profile
Lấy thông tin profile của user hiện tại.

**Request Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "User Name",
    "email": "user@example.com",
    "avatar": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Response Error (401):**
```json
{
  "message": "No token provided"
}
```

### PUT /api/profile
Cập nhật thông tin profile.

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body (all fields optional):**
```json
{
  "name": "New Name",
  "email": "newemail@example.com",
  "avatar": "https://...",
  "currentPassword": "old123",
  "newPassword": "new123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "...",
    "name": "New Name",
    "email": "newemail@example.com",
    "avatar": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Response Error Examples:**
```json
// Empty name
{
  "success": false,
  "message": "Name cannot be empty"
}

// Invalid email format
{
  "success": false,
  "message": "Invalid email format"
}

// Email already in use
{
  "success": false,
  "message": "Email already in use"
}

// Wrong current password
{
  "success": false,
  "message": "Current password is incorrect"
}

// Password too short
{
  "success": false,
  "message": "New password must be at least 6 characters"
}
```

## ✅ Validation Rules

| Field | Rules |
|-------|-------|
| `name` | - Không được empty<br>- Tự động trim whitespace |
| `email` | - Phải đúng format email<br>- Phải unique<br>- Convert to lowercase |
| `avatar` | - Optional<br>- Có thể là URL hoặc path |
| `currentPassword` | - Required khi đổi password<br>- Phải match với password hiện tại |
| `newPassword` | - Min length: 6 characters<br>- Tự động hash trước khi save |

## 🔒 Security Features

1. **JWT Authentication**: Tất cả endpoints require valid token
2. **Password Hashing**: Sử dụng bcrypt với salt rounds = 10
3. **Password Verification**: Phải verify current password trước khi đổi
4. **Email Uniqueness**: Check email không trùng với user khác
5. **Input Validation**: Validate tất cả input trước khi save
6. **Sensitive Data Protection**: Exclude password và `__v` từ response

## 📊 Error Codes

| Status Code | Meaning |
|------------|---------|
| 200 | Success |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - No token hoặc invalid token |
| 404 | User not found |
| 500 | Internal Server Error |

## 🐛 Troubleshooting

### Lỗi "No token provided"
- **Nguyên nhân**: Thiếu token trong header
- **Giải pháp**: Thêm header `Authorization: Bearer <token>`

### Lỗi "Invalid token"
- **Nguyên nhân**: Token không hợp lệ hoặc đã hết hạn
- **Giải pháp**: Đăng nhập lại để lấy token mới

### Lỗi "Email already in use"
- **Nguyên nhân**: Email đã được user khác sử dụng
- **Giải pháp**: Sử dụng email khác

### Lỗi "Current password is incorrect"
- **Nguyên nhân**: Current password không đúng
- **Giải pháp**: Nhập đúng current password

### Server không start
- **Kiểm tra**: MongoDB có đang chạy không?
- **Kiểm tra**: File `.env` có đúng config không?
- **Kiểm tra**: Port 5000 có bị chiếm không?

## 📚 Tài liệu Tham khảo

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

## 👥 Contributors

**Sinh viên 1**: Implementation của API /profile (GET, PUT) - Backend

---

**Last Updated**: November 2025
