# Hệ Thống Xác Thực React (Authentication System)

## Sinh viên 2: Form đăng ký, đăng nhập React, lưu token

Hệ thống xác thực hoàn chỉnh với React + Node.js/Express + MongoDB + JWT

---

## ✨ Tính Năng Đã Triển Khai

### 1. Đăng Ký (Sign Up)
- ✅ Form đăng ký với các trường: Họ tên, Email, Mật khẩu, Xác nhận mật khẩu
- ✅ Validation phía client:
  - Kiểm tra email hợp lệ (regex)
  - Kiểm tra mật khẩu tối thiểu 6 ký tự
  - Kiểm tra mật khẩu khớp nhau
  - Hiển thị lỗi real-time
- ✅ Gọi API `POST /api/signup`
- ✅ Xử lý lỗi từ backend (email đã tồn tại)
- ✅ Mã hóa mật khẩu bằng bcrypt (backend)
- ✅ Chuyển hướng tự động đến trang đăng nhập sau khi thành công

### 2. Đăng Nhập (Login)
- ✅ Form đăng nhập với Email và Mật khẩu
- ✅ Validation phía client
- ✅ Gọi API `POST /api/login`
- ✅ Nhận JWT token từ backend
- ✅ Lưu token vào localStorage
- ✅ Lưu thông tin user vào Context
- ✅ Chuyển hướng tự động đến trang Home sau khi đăng nhập thành công

### 3. Đăng Xuất (Logout)
- ✅ Nút đăng xuất trên Navbar
- ✅ Gọi API `POST /api/logout`
- ✅ Xóa token khỏi localStorage
- ✅ Xóa user khỏi Context
- ✅ Chuyển hướng về trang Login

### 4. Bảo Vệ Route (Protected Routes)
- ✅ Middleware kiểm tra authentication
- ✅ Tự động redirect về /login nếu chưa đăng nhập
- ✅ Persist authentication qua localStorage (reload vẫn giữ đăng nhập)

### 5. Quản Lý State
- ✅ AuthContext để quản lý global auth state
- ✅ Custom hook `useAuth()` để sử dụng auth trong components
- ✅ Axios interceptors tự động thêm JWT token vào headers

---

## 📁 Cấu Trúc Files Đã Tạo

```
frontend/src/
├── components/
│   ├── Signup.jsx          # Form đăng ký
│   ├── Login.jsx           # Form đăng nhập
│   ├── Navbar.jsx          # Navigation bar với nút Logout
│   ├── Home.jsx            # Trang chủ (protected)
│   ├── ProtectedRoute.jsx  # Component bảo vệ routes
│   ├── AddUser.jsx         # (existing) Thêm user
│   └── UserList.jsx        # (existing) Danh sách user
├── context/
│   └── AuthContext.js      # Context quản lý authentication state
├── services/
│   └── api.js              # Axios config + API methods
├── styles/
│   ├── Auth.css            # Styles cho Signup/Login
│   ├── Navbar.css          # Styles cho Navbar
│   └── Home.css            # Styles cho Home page
├── App.jsx                 # Main app với routing
├── App.css                 # Global styles
└── index.js                # Entry point

backend/
├── controllers/
│   ├── authController.js   # signup, login, logout handlers
│   └── userController.js   # getProfile, updateProfile
├── middleware/
│   └── authMiddleware.js   # JWT verification
├── routes/
│   └── index.js            # API routes (updated với logout)
└── server.js               # Express server
```

---

## 🚀 Cách Chạy Ứng Dụng

### 1. Backend (Terminal 1)
```powershell
cd d:\Mangonmo\Group_project4_PMNM\backend
node server.js
```
Backend sẽ chạy tại: `http://localhost:5000`

### 2. Frontend (Terminal 2)
```powershell
cd d:\Mangonmo\Group_project4_PMNM\frontend
npm start
```
Frontend sẽ chạy tại: `http://localhost:3000`

---

## 🧪 Test Flow (Luồng Hoạt Động)

### A. Đăng Ký Tài Khoản Mới
1. Mở trình duyệt: `http://localhost:3000/signup`
2. Nhập thông tin:
   - Họ tên: `Nguyen Van A`
   - Email: `test@example.com`
   - Mật khẩu: `123456`
   - Xác nhận mật khẩu: `123456`
3. Click **Đăng Ký**
4. Backend:
   - Kiểm tra email đã tồn tại chưa
   - Mã hóa mật khẩu bằng bcrypt
   - Lưu vào MongoDB
   - Trả về `{ message: "Signup successful!" }`
5. Frontend tự động chuyển đến `/login` sau 2 giây

### B. Đăng Nhập
1. Tại trang `/login`, nhập:
   - Email: `test@example.com`
   - Mật khẩu: `123456`
2. Click **Đăng Nhập**
3. Backend:
   - Tìm user theo email
   - So sánh password với bcrypt
   - Tạo JWT token (expire 1 ngày)
   - Trả về `{ message: "Login successful", token: "ey..." }`
4. Frontend:
   - Lưu token vào `localStorage.setItem("token", ...)`
   - Lưu user info vào `localStorage.setItem("user", ...)`
   - Update AuthContext state
   - Chuyển đến trang `/` (Home)

### C. Kiểm Tra Token Đã Lưu
Mở **DevTools Console** (F12):
```javascript
localStorage.getItem("token")
// => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

localStorage.getItem("user")
// => "{\"email\":\"test@example.com\"}"
```

### D. Đăng Xuất
1. Click nút **Đăng Xuất** trên Navbar
2. Backend:
   - API `POST /api/logout` trả về `{ message: "Logout successful" }`
3. Frontend:
   - Xóa `localStorage.removeItem("token")`
   - Xóa `localStorage.removeItem("user")`
   - Reset AuthContext state
   - Chuyển về `/login`

### E. Reload Trang (Persistence Test)
1. Đăng nhập thành công
2. Reload trang (F5)
3. **Kết quả**: Vẫn đăng nhập (token vẫn có trong localStorage)
4. AuthContext tự động restore state từ localStorage

---

## 🔑 API Endpoints Được Sử Dụng

| Method | Endpoint         | Auth Required | Mô Tả                           |
|--------|------------------|---------------|---------------------------------|
| POST   | `/api/signup`    | ❌            | Đăng ký tài khoản mới          |
| POST   | `/api/login`     | ❌            | Đăng nhập, nhận JWT token      |
| POST   | `/api/logout`    | ❌            | Đăng xuất (stateless)          |
| GET    | `/api/profile`   | ✅            | Lấy thông tin user             |
| PUT    | `/api/profile`   | ✅            | Cập nhật thông tin user        |

---

## 🎨 Screenshots Mẫu

### 1. Trang Đăng Ký
- Gradient background (purple)
- Form trắng center
- Validation errors màu đỏ
- Link "Đăng nhập ngay"

### 2. Trang Đăng Nhập
- Design tương tự Signup
- 2 trường: Email, Password
- Button gradient
- Link "Đăng ký ngay"

### 3. Navbar
- Gradient background
- Khi chưa đăng nhập: "Đăng nhập" + "Đăng ký"
- Khi đã đăng nhập: "Xin chào, User" + "Trang chủ" + "Đăng xuất" (đỏ)

### 4. Home Page (Protected)
- Welcome banner gradient
- "Chào mừng, [Tên User]!"
- Grid 2 cột: AddUser + UserList

---

## 🛡️ Bảo Mật

### Client-side
- ✅ Input validation (email format, password length)
- ✅ XSS protection (React tự động escape)
- ✅ Token stored in localStorage (có thể nâng cấp lên HTTP-only cookie)

### Server-side
- ✅ Password hashing với bcrypt (10 rounds)
- ✅ JWT token với expiry (1 ngày)
- ✅ JWT_SECRET trong .env
- ✅ Middleware authenticate cho protected routes
- ✅ CORS configured

### Lưu ý
- JWT stateless: token vẫn hợp lệ cho đến khi hết hạn (không có blacklist)
- Để revoke token ngay lập tức, cần implement token blacklist (Redis/DB)

---

## 🔄 Axios Interceptors

### Request Interceptor
```javascript
// Tự động thêm token vào header cho mọi request
config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
```

### Response Interceptor
```javascript
// Tự động logout khi gặp 401 (token hết hạn)
if (error.response?.status === 401) {
  localStorage.clear();
  window.location.href = "/login";
}
```

---

## 📝 Validation Rules

### Signup Form
- **Họ tên**: Không trống, tối thiểu 2 ký tự
- **Email**: Format hợp lệ (regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Mật khẩu**: Tối thiểu 6 ký tự
- **Xác nhận mật khẩu**: Phải khớp với mật khẩu

### Login Form
- **Email**: Không trống, format hợp lệ
- **Mật khẩu**: Không trống

---

## 🎯 Điểm Đặc Biệt

1. **Real-time Error Display**: Lỗi hiển thị ngay khi user nhập sai và tự động mất khi sửa
2. **Loading States**: Button disabled + text "Đang xử lý..." khi gọi API
3. **Success Messages**: Toast/banner màu xanh khi thành công
4. **Auto Redirect**: Tự động chuyển trang sau khi thành công
5. **Responsive Design**: Mobile-friendly
6. **Clean UI**: Gradient, shadows, animations

---

## 🚧 Nâng Cấp Tương Lai (Optional)

- [ ] Token blacklist (Redis) để revoke ngay lập tức
- [ ] Refresh token pattern (access token 15 phút, refresh token 7 ngày)
- [ ] HTTP-only cookie thay vì localStorage (chống XSS)
- [ ] Social login (Google, Facebook)
- [ ] Email verification
- [ ] Forgot password
- [ ] Remember me checkbox
- [ ] Session timeout warning

---

## 📞 Hỗ Trợ

Nếu gặp lỗi:
1. Kiểm tra backend đang chạy (`http://localhost:5000`)
2. Kiểm tra MongoDB đã connect
3. Kiểm tra Console (F12) để xem lỗi
4. Kiểm tra Network tab để xem API response

---

## ✅ Checklist Hoàn Thành

- [x] 1. Đăng ký (Sign Up) – tạo tài khoản, kiểm tra email trùng, mã hóa mật khẩu bằng bcrypt
- [x] 2. Đăng nhập (Login) – kiểm tra email/password, trả về JWT token
- [x] 3. Đăng xuất (Logout) – xóa token phía client
- [x] Form validation
- [x] Error handling
- [x] Success messages
- [x] Protected routes
- [x] Token persistence
- [x] Responsive design
- [x] Clean UI/UX

---

**Hoàn thành bởi: Sinh viên 2**  
**Ngày: November 8, 2025**
