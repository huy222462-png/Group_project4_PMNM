# ⚡ Quick Start - Test Forgot Password Feature

## 📋 Prerequisites
- ✅ Backend đã cài nodemailer (`npm install nodemailer`)
- ✅ Gmail đã bật 2FA
- ✅ Gmail App Password đã tạo

---

## 🚀 Bước 1: Cấu hình `.env`

**Copy từ `.env.example` và điền thông tin:**

```bash
cd backend
cp .env.example .env
```

**Cập nhật `.env`:**
```env
EMAIL_USER=your-email@gmail.com        # ← Email Gmail của bạn
EMAIL_PASS=xxxx xxxx xxxx xxxx         # ← App Password từ Gmail
```

**Lấy Gmail App Password:**
1. Truy cập: https://myaccount.google.com/apppasswords
2. Chọn "Mail" → "Other" → Nhập "Node.js App"
3. Copy mật khẩu 16 ký tự (có dấu cách)

---

## 🏃 Bước 2: Khởi động App

### Terminal 1 - Backend:
```bash
cd backend
npm start
```
✅ Server chạy tại: http://localhost:5000

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```
✅ App chạy tại: http://localhost:3000

---

## 🧪 Bước 3: Test Flow

### Test 1: Forgot Password
1. Mở browser: `http://localhost:3000/login`
2. Click **"Quên mật khẩu?"**
3. Nhập email đã đăng ký (VD: `test@example.com`)
4. Click **"Send Reset Link"**
5. Kiểm tra message: "Password reset link has been sent to your email"

### Test 2: Kiểm tra Email
1. Mở Gmail inbox
2. Tìm email với subject: **"Password Reset Request"**
3. Click button **"Reset Password"** trong email
   - Hoặc copy link: `http://localhost:3000/reset-password/{token}`

### Test 3: Reset Password
1. Nhập password mới (tối thiểu 6 ký tự)
2. Nhập lại password để confirm
3. Click **"Reset Password"**
4. Kiểm tra message: "Password has been reset successfully"
5. Tự động chuyển về trang Login sau 2 giây

### Test 4: Login với Password Mới
1. Nhập email
2. Nhập password mới vừa đổi
3. Click **"Đăng Nhập"**
4. ✅ Success! Chuyển về trang Home

---

## 🐛 Troubleshooting

### ❌ Lỗi: "Error sending email"
**Kiểm tra:**
- [ ] `EMAIL_USER` đúng format (có @gmail.com)
- [ ] `EMAIL_PASS` là App Password (16 ký tự, có dấu cách)
- [ ] Gmail đã bật 2FA
- [ ] `.env` file nằm trong `backend/`

### ❌ Email không nhận được
**Giải pháp:**
1. Kiểm tra folder **Spam/Junk**
2. Đợi 1-2 phút
3. Check backend console có log: "✅ Password reset email sent to: xxx"

### ❌ "Invalid or expired reset token"
**Nguyên nhân:**
- Token đã hết hạn (> 1 giờ)
- Token trong URL bị sai

**Giải pháp:**
- Request forgot password lại
- Copy link từ email mới nhất

---

## 📸 Checklist Demo Screenshots

Cần chụp để nộp bài:
- [ ] Login page với link "Quên mật khẩu?"
- [ ] Forgot password form sau khi nhập email
- [ ] Success message sau khi gửi email
- [ ] Email nhận được trong inbox
- [ ] Reset password form
- [ ] Success message sau khi reset
- [ ] Login thành công với password mới

---

## 🔍 Debug Commands

**Test backend API với curl:**

```bash
# Test forgot password
curl -X POST http://localhost:5000/api/forgot-password \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\"}"

# Test reset password (thay {token} bằng token thật từ email)
curl -X POST http://localhost:5000/api/reset-password/{token} \
  -H "Content-Type: application/json" \
  -d "{\"password\":\"newpassword123\"}"
```

**Check MongoDB có token:**
```javascript
// Trong MongoDB Compass hoặc shell
db.users.find({ email: "test@example.com" }).pretty()

// Check fields: resetPasswordToken, resetPasswordExpires
```

---

## ✅ Feature Checklist

Backend:
- [x] Install nodemailer
- [x] Update User model (resetPasswordToken, resetPasswordExpires)
- [x] Create emailService.js
- [x] Add forgotPassword controller
- [x] Add resetPassword controller
- [x] Update routes
- [x] Configure .env

Frontend:
- [x] Create ForgotPassword.jsx
- [x] Create ResetPassword.jsx
- [x] Update App.jsx routes
- [x] Add link in Login.jsx
- [x] Update Auth.css

Testing:
- [ ] Configure Gmail App Password
- [ ] Test forgot password flow
- [ ] Test email sending
- [ ] Test reset password
- [ ] Test expired token
- [ ] Screenshot demo

Git:
- [x] Commit code
- [ ] Push to GitHub
- [ ] Create Pull Request

---

## 📖 Full Documentation

Xem chi tiết tại:
- `FORGOT_PASSWORD_SETUP.md` - Setup guide
- `FORGOT_PASSWORD_FEATURE.md` - Technical docs

---

**Author:** PMNM Team  
**Branch:** feature/forgot-password  
**Date:** 2024
