# 📧 Hướng Dẫn Cấu Hình Forgot Password với Gmail SMTP

## 🎯 Mục tiêu
- Gửi email thật với token reset password
- Tăng tính bảo mật với token có thời hạn
- Tích hợp Nodemailer + Gmail SMTP

---

## 🔧 Bước 1: Cấu hình Gmail App Password

### 1.1. Bật xác thực 2 bước (2FA)
1. Truy cập: https://myaccount.google.com/security
2. Tìm "2-Step Verification" (Xác minh 2 bước)
3. Bật nó lên nếu chưa có

### 1.2. Tạo App Password
1. Truy cập: https://myaccount.google.com/apppasswords
2. Chọn "Select app" → **Mail**
3. Chọn "Select device" → **Other (Custom name)**
4. Nhập tên: `Node.js PMNM App`
5. Click **Generate**
6. Copy mật khẩu 16 ký tự (dạng: `xxxx xxxx xxxx xxxx`)

### 1.3. Cập nhật file `.env`
```env
PORT=5000
MONGO_URI=mongodb+srv://H12345:Huy123@cluster0.v85kxtq.mongodb.net/pmnm_db?retryWrites=true&w=majority
JWT_SECRET=secretkey123

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com        # ← Thay bằng email của bạn
EMAIL_PASS=xxxx xxxx xxxx xxxx         # ← Dán App Password vào đây
```

**⚠️ Lưu ý:**
- Không bỏ dấu cách trong App Password
- Không commit file `.env` lên GitHub
- Kiểm tra `.gitignore` đã có `.env`

---

## 🚀 Bước 2: Khởi động Backend

```bash
cd backend
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

---

## 🎨 Bước 3: Khởi động Frontend

Mở terminal mới:

```bash
cd frontend
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

---

## 🧪 Bước 4: Test Forgot Password Flow

### 4.1. Forgot Password
1. Truy cập: `http://localhost:3000/login`
2. Click link **"Quên mật khẩu?"**
3. Nhập email đã đăng ký
4. Click **"Send Reset Link"**
5. Kiểm tra email inbox

### 4.2. Kiểm tra Email
Bạn sẽ nhận được email như sau:

```
Subject: Password Reset Request

Password Reset Request

You requested to reset your password. Click the link below to reset it:

[Reset Password]

This link will expire in 1 hour.

If you didn't request this, please ignore this email.
```

### 4.3. Reset Password
1. Click link trong email (hoặc copy link)
2. Nhập password mới (tối thiểu 6 ký tự)
3. Nhập lại password để confirm
4. Click **"Reset Password"**
5. Đăng nhập với password mới

---

## 📋 API Endpoints

### POST /api/forgot-password
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "message": "Password reset link has been sent to your email"
}
```

**Response (Error):**
```json
{
  "message": "Error sending email. Please try again later."
}
```

---

### POST /api/reset-password/:token
**Request:**
```json
{
  "password": "newpassword123"
}
```

**Response (Success):**
```json
{
  "message": "Password has been reset successfully"
}
```

**Response (Error):**
```json
{
  "message": "Invalid or expired reset token"
}
```

---

## 🔐 Cơ chế Bảo mật

### 1. Token Hashing
- Token gốc gửi qua email: `crypto.randomBytes(32).toString("hex")`
- Token hash lưu DB: `crypto.createHash("sha256").update(token).digest("hex")`
- Khi reset, hash lại token từ URL để so sánh với DB

### 2. Token Expiration
- Token hết hạn sau 1 giờ
- Kiểm tra: `resetPasswordExpires: { $gt: Date.now() }`

### 3. Security Best Practices
- Không tiết lộ email có tồn tại hay không
- Token chỉ dùng 1 lần (xóa sau khi reset)
- Password mới phải hash với bcrypt

---

## 🐛 Troubleshooting

### ❌ Lỗi: "Error sending email"
**Nguyên nhân:**
- App Password sai
- Gmail chưa bật 2FA
- Firewall chặn port 587/465

**Giải pháp:**
1. Kiểm tra lại App Password
2. Thử tạo App Password mới
3. Kiểm tra `.env` có đúng format

---

### ❌ Lỗi: "Invalid or expired reset token"
**Nguyên nhân:**
- Token đã hết hạn (> 1 giờ)
- Token đã được sử dụng
- Token trong URL bị sai

**Giải pháp:**
1. Request forgot password lại
2. Kiểm tra link trong email còn hạn không

---

### ❌ Email không nhận được
**Nguyên nhân:**
- Email vào Spam/Junk
- Gmail block gửi (quá nhiều email trong thời gian ngắn)

**Giải pháp:**
1. Kiểm tra folder Spam
2. Đợi 5-10 phút
3. Thử với email khác

---

## 📸 Screenshots Demo

### 1. Login Page - Forgot Password Link
![Login](screenshots/login-forgot-link.png)

### 2. Forgot Password Form
![Forgot Password](screenshots/forgot-password-form.png)

### 3. Email Received
![Email](screenshots/email-reset-link.png)

### 4. Reset Password Form
![Reset Password](screenshots/reset-password-form.png)

---

## ✅ Checklist

- [ ] Cấu hình Gmail App Password
- [ ] Cập nhật `.env` với EMAIL_USER và EMAIL_PASS
- [ ] Khởi động backend (npm start)
- [ ] Khởi động frontend (npm start)
- [ ] Test forgot password flow
- [ ] Kiểm tra email nhận được
- [ ] Test reset password
- [ ] Đăng nhập với password mới
- [ ] Chụp screenshots
- [ ] Commit code
- [ ] Push lên GitHub
- [ ] Tạo Pull Request

---

## 📝 Notes

**Frontend Components:**
- `ForgotPassword.jsx` - Form nhập email
- `ResetPassword.jsx` - Form đổi password mới

**Backend Files:**
- `models/User.js` - Thêm resetPasswordToken, resetPasswordExpires
- `controllers/authController.js` - forgotPassword, resetPassword
- `utils/emailService.js` - Nodemailer configuration
- `routes/index.js` - Routes mới

**Dependencies:**
- `nodemailer` - Gửi email
- `crypto` - Tạo token bảo mật (built-in Node.js)

---

## 🎓 Tham khảo

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Password Guide](https://support.google.com/accounts/answer/185833)
- [Crypto Module - Node.js](https://nodejs.org/api/crypto.html)

---

**Author:** PMNM Team  
**Date:** 2024  
**Version:** 1.0
