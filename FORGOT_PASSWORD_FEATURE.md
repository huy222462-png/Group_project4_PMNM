# 🔐 Forgot Password Feature

## 📝 Tổng quan
Feature **Forgot Password** cho phép người dùng reset mật khẩu thông qua email với token bảo mật.

## ✨ Tính năng
- ✅ Gửi email reset password với token bảo mật
- ✅ Token có thời hạn 1 giờ
- ✅ Hash token trước khi lưu database
- ✅ Validate password mới (tối thiểu 6 ký tự)
- ✅ UI/UX thân thiện với form validation
- ✅ Tự động redirect về login sau reset thành công

## 🛠️ Technical Stack
- **Backend:** Node.js, Express
- **Email Service:** Nodemailer (Gmail SMTP)
- **Security:** crypto (token generation & hashing), bcrypt (password hashing)
- **Frontend:** React, React Router
- **Database:** MongoDB (add resetPasswordToken, resetPasswordExpires fields)

## 📂 File Changes

### Backend
**New Files:**
- `backend/utils/emailService.js` - Nodemailer configuration

**Modified Files:**
- `backend/models/User.js` - Add resetPasswordToken, resetPasswordExpires
- `backend/controllers/authController.js` - Add forgotPassword, resetPassword
- `backend/routes/index.js` - Add /forgot-password, /reset-password routes
- `backend/package.json` - Add nodemailer dependency
- `backend/.env` - Add EMAIL_USER, EMAIL_PASS

### Frontend
**New Files:**
- `frontend/src/components/ForgotPassword.jsx` - Form nhập email
- `frontend/src/components/ResetPassword.jsx` - Form đổi password

**Modified Files:**
- `frontend/src/App.jsx` - Add routes /forgot-password, /reset-password/:token
- `frontend/src/components/Login.jsx` - Add "Forgot Password?" link
- `frontend/src/styles/Auth.css` - Add styles for forgot password components

## 🔄 Flow Diagram

```
1. User clicks "Forgot Password?" on Login page
   ↓
2. User enters email → POST /api/forgot-password
   ↓
3. Backend generates token, hashes it, saves to DB
   ↓
4. Backend sends email with reset link containing token
   ↓
5. User clicks link in email → /reset-password/:token
   ↓
6. User enters new password → POST /api/reset-password/:token
   ↓
7. Backend validates token, hashes password, updates DB
   ↓
8. Success → Redirect to login
```

## 🔐 Security Features

### 1. Token Generation
```javascript
const resetToken = crypto.randomBytes(32).toString("hex");
```
- Random 32 bytes (256 bits)
- Converted to hex string (64 characters)

### 2. Token Hashing
```javascript
const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
```
- Hash with SHA-256 before saving to DB
- Only hashed version stored in database
- Original token sent via email

### 3. Token Expiration
```javascript
user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
```
- Token valid for 1 hour only
- Checked on reset: `resetPasswordExpires: { $gt: Date.now() }`

### 4. Password Hashing
```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```
- bcrypt with 10 salt rounds
- Same as signup/login

### 5. One-time Token
```javascript
user.resetPasswordToken = null;
user.resetPasswordExpires = null;
```
- Token cleared after successful reset
- Cannot reuse same token

## 🌐 API Endpoints

### POST /api/forgot-password
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "message": "Password reset link has been sent to your email"
}
```

**Error Response (500):**
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

**Success Response (200):**
```json
{
  "message": "Password has been reset successfully"
}
```

**Error Response (400):**
```json
{
  "message": "Invalid or expired reset token"
}
```

## 📧 Email Template

**Subject:** Password Reset Request

**Body:**
```html
Password Reset Request

You requested to reset your password. Click the link below to reset it:

[Reset Password Button]
↓
http://localhost:3000/reset-password/{token}

This link will expire in 1 hour.

If you didn't request this, please ignore this email.
```

## 🎨 Frontend Components

### ForgotPassword.jsx
```jsx
- Email input field
- Validation (required, email format)
- Success/error message display
- Loading state
- Link back to Login
```

### ResetPassword.jsx
```jsx
- Password input field
- Confirm password field
- Password validation (min 6 chars, match)
- Success/error message display
- Loading state
- Auto redirect to login after success
```

## 🧪 Testing Guide

### Manual Testing
1. **Test Forgot Password:**
   - Go to `/login`
   - Click "Quên mật khẩu?"
   - Enter registered email
   - Check email inbox/spam

2. **Test Reset Password:**
   - Click link in email
   - Enter new password (min 6 chars)
   - Confirm password
   - Verify redirect to login

3. **Test Expired Token:**
   - Wait > 1 hour after requesting reset
   - Try to use link
   - Should show "Invalid or expired reset token"

4. **Test Invalid Token:**
   - Modify token in URL
   - Try to reset
   - Should show "Invalid or expired reset token"

### Postman Testing

**Forgot Password:**
```
POST http://localhost:5000/api/forgot-password
Content-Type: application/json

{
  "email": "test@example.com"
}
```

**Reset Password:**
```
POST http://localhost:5000/api/reset-password/{token}
Content-Type: application/json

{
  "password": "newpassword123"
}
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Get Gmail App Password:**
1. Enable 2FA: https://myaccount.google.com/security
2. Create App Password: https://myaccount.google.com/apppasswords
3. Select "Mail" → "Other" → Enter name → Generate
4. Copy 16-character password

## 🐛 Common Issues

### Email not sending
**Solution:**
- Check EMAIL_USER and EMAIL_PASS in .env
- Verify Gmail App Password is correct
- Check 2FA is enabled on Gmail
- Check spam folder

### Token expired
**Solution:**
- Request new forgot password
- Use link within 1 hour

### Password too short
**Solution:**
- Must be at least 6 characters

## 📋 Checklist

- [x] Install nodemailer
- [x] Update User model
- [x] Create emailService.js
- [x] Add forgotPassword controller
- [x] Add resetPassword controller
- [x] Update routes
- [x] Create ForgotPassword component
- [x] Create ResetPassword component
- [x] Update App.jsx routes
- [x] Update Login.jsx with forgot link
- [x] Add CSS styles
- [x] Configure .env
- [ ] Test with real Gmail
- [ ] Screenshot demo
- [ ] Commit code
- [ ] Push to GitHub
- [ ] Create Pull Request

## 🚀 Deployment Notes

**Before Deploy:**
1. Update EMAIL_USER with production email
2. Update resetUrl in emailService.js with production domain
3. Ensure .env is not committed
4. Add .env.example for team reference

**Production URL Example:**
```javascript
const resetUrl = `https://your-domain.com/reset-password/${resetToken}`;
```

## 📖 Documentation Files
- `FORGOT_PASSWORD_SETUP.md` - Chi tiết setup & testing guide
- `AUTHENTICATION_README.md` - Overview authentication system

## 👥 Contributors
- PMNM Team

## 📅 Date
- Created: 2024
- Branch: feature/forgot-password

---

**Next Steps:**
1. Configure Gmail App Password
2. Update .env file
3. Test forgot password flow
4. Screenshot demo
5. Commit & Push
6. Create Pull Request
