# 📚 PHÂN CÔNG CÔNG VIỆC - PMNM PROJECT

## 👨‍💻 SINH VIÊN 1: Backend APIs

### ✅ Hoàn thành:
1. **API `/forgot-password`**
   - File: `backend/controllers/authController.js`
   - Tạo reset token (crypto.randomBytes)
   - Hash token với SHA-256
   - Lưu token + expiration vào DB
   - Gửi email với Nodemailer

2. **API `/reset-password/:token`**
   - File: `backend/controllers/authController.js`
   - Verify token và expiration
   - Hash password mới với bcrypt
   - Xóa token sau khi reset
   - Update password trong DB

3. **API `/upload-avatar`**
   - File: `backend/controllers/uploadController.js`
   - Upload ảnh lên Cloudinary
   - Transform ảnh (500x500px, auto quality)
   - Xóa ảnh cũ nếu có
   - Update avatar URL vào DB
   - Return user với avatar mới

4. **API `/delete-avatar`**
   - File: `backend/controllers/uploadController.js`
   - Xóa ảnh trên Cloudinary
   - Clear avatar field trong DB

### 📂 Files được tạo/sửa:
- `backend/controllers/authController.js` (forgot + reset password)
- `backend/controllers/uploadController.js` (upload + delete avatar)
- `backend/config/cloudinary.js` (Cloudinary config)
- `backend/middleware/multerUpload.js` (Multer middleware)
- `backend/routes/index.js` (Routes mới)
- `backend/utils/emailService.js` (Email service)
- `backend/models/User.js` (Add resetPasswordToken, resetPasswordExpires)

### 🧪 Test với Postman:
- Import file: `PMNM_Complete_API.postman_collection.json`
- Đọc hướng dẫn: `POSTMAN_TESTING_GUIDE.md`

---

## 🎨 SINH VIÊN 2: Frontend UI

### ✅ Hoàn thành:
1. **Forgot Password Form**
   - File: `frontend/src/components/ForgotPassword.jsx`
   - Input email
   - Validation (email format)
   - Call API `/forgot-password`
   - Success/error messages
   - Link back to Login

2. **Reset Password Form**
   - File: `frontend/src/components/ResetPassword.jsx`
   - Get token từ URL params
   - Input new password + confirm password
   - Validation (min 6 chars, passwords match)
   - Call API `/reset-password/:token`
   - Auto redirect to Login sau success

3. **Upload Avatar UI**
   - File: `frontend/src/components/UploadAvatar.jsx`
   - File input với preview
   - Validate file type (image only)
   - Validate file size (max 5MB)
   - Upload button
   - Delete button
   - Success/error messages
   - Update avatar in real-time

### 📂 Files được tạo/sửa:
- `frontend/src/components/ForgotPassword.jsx`
- `frontend/src/components/ResetPassword.jsx`
- `frontend/src/components/UploadAvatar.jsx`
- `frontend/src/styles/Auth.css` (Updated)
- `frontend/src/styles/UploadAvatar.css` (New)
- `frontend/src/App.jsx` (Add routes)
- `frontend/src/components/Login.jsx` (Add "Forgot Password?" link)

### 🎨 UI Features:
- Responsive design (mobile-friendly)
- Gradient buttons
- Form validation
- Loading states
- Success/error messages
- Professional styling

---

## 🔌 SINH VIÊN 3: Database & Integration

### ✅ Hoàn thành:
1. **MongoDB Integration**
   - User model updated với:
     - `resetPasswordToken: String`
     - `resetPasswordExpires: Date`
     - `avatar: String`

2. **Cloudinary Integration**
   - Setup Cloudinary config
   - Upload images to cloud
   - Transform images (500x500, auto quality)
   - Delete old images
   - Return secure URLs

3. **Email Service Integration**
   - Nodemailer setup với Gmail SMTP
   - Professional HTML email template
   - Test mode (log to console)
   - Production mode (send real emails)

4. **Testing Reset Password**
   - Postman collection đầy đủ
   - Test forgot password flow
   - Test reset password with token
   - Test email sending (TEST MODE & PROD MODE)

### 📂 Files được tạo/sửa:
- `backend/models/User.js` (Updated schema)
- `backend/config/cloudinary.js` (Cloudinary setup)
- `backend/utils/emailService.js` (Email service)
- `backend/.env` (Add Cloudinary credentials)
- `PMNM_Complete_API.postman_collection.json` (Test collection)
- `POSTMAN_TESTING_GUIDE.md` (Test documentation)

### 🧪 Testing Responsibilities:
- Test forgot password API
- Test reset password API
- Test upload avatar to Cloudinary
- Test email sending (both modes)
- Verify database updates
- Document test results

---

## 🚀 SETUP & RUN

### Backend:
```bash
cd backend

# Install dependencies
npm install

# Configure .env
# - EMAIL_USER, EMAIL_PASS (Gmail App Password)
# - CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET

# Run server
node server.js
```

### Frontend:
```bash
cd frontend

# Install dependencies
npm install

# Run app
npm start
```

---

## ⚙️ CONFIGURATION

### 1. Email (Gmail SMTP)
```env
EMAIL_TEST_MODE=false               # true = log to console, false = send real email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password       # From https://myaccount.google.com/apppasswords
```

### 2. Cloudinary
```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Get Cloudinary credentials:**
1. Sign up: https://cloudinary.com/users/register_free
2. Dashboard: https://cloudinary.com/console
3. Copy Cloud Name, API Key, API Secret

---

## 📋 API ENDPOINTS

### Authentication:
- `POST /api/signup` - Đăng ký
- `POST /api/login` - Đăng nhập
- `POST /api/logout` - Đăng xuất

### Password Reset:
- `POST /api/forgot-password` - Gửi email reset
- `POST /api/reset-password/:token` - Đổi password

### Profile:
- `GET /api/profile` - Xem profile
- `PUT /api/profile` - Cập nhật profile

### Upload Avatar:
- `POST /api/upload-avatar` - Upload ảnh (multipart/form-data)
- `DELETE /api/delete-avatar` - Xóa avatar

### Admin:
- `GET /api/users` - Lấy tất cả users (admin only)
- `GET /api/users/:id` - Lấy user theo ID (admin only)
- `DELETE /api/users/:id` - Xóa user (admin only)
- `PUT /api/users/:id/role` - Đổi role (admin only)

---

## 🧪 TESTING WORKFLOW

### 1. Test Forgot Password:
```
Frontend: /login → "Forgot Password?" → Enter email → Submit
Backend: Log token to console (TEST MODE) hoặc gửi email (PROD MODE)
Frontend: /reset-password/:token → Enter new password → Submit
Test: Login với password mới → Success ✅
```

### 2. Test Upload Avatar:
```
Frontend: Profile page → Upload Avatar component → Choose image → Upload
Backend: Upload to Cloudinary → Return URL
Frontend: Avatar updates in real-time
Database: avatar field updated
Cloudinary: Image stored in cloud
```

### 3. Test với Postman:
```
1. Import: PMNM_Complete_API.postman_collection.json
2. Setup Environment: baseUrl = http://localhost:5000
3. Test theo thứ tự trong POSTMAN_TESTING_GUIDE.md
```

---

## 📊 DELIVERABLES

### Sinh viên 1:
- [ ] Code backend APIs (forgot, reset, upload avatar)
- [ ] Postman collection test thành công
- [ ] Screenshots Postman responses

### Sinh viên 2:
- [ ] Frontend components (ForgotPassword, ResetPassword, UploadAvatar)
- [ ] Screenshots UI flow
- [ ] Demo video (optional)

### Sinh viên 3:
- [ ] Cloudinary integration hoạt động
- [ ] Database schema updated
- [ ] Email gửi thành công (screenshots)
- [ ] Test report (Postman + Frontend)

---

## 📖 DOCUMENTATION

1. **POSTMAN_TESTING_GUIDE.md** - Hướng dẫn test API
2. **FORGOT_PASSWORD_SETUP.md** - Setup Gmail App Password
3. **FORGOT_PASSWORD_FEATURE.md** - Technical docs
4. **QUICK_TEST_FORGOT_PASSWORD.md** - Quick test guide
5. **IMPLEMENTATION_COMPLETE.md** - Feature summary

---

## 🎯 SUCCESS CRITERIA

- [ ] Forgot password gửi email thành công
- [ ] Reset password với token hoạt động
- [ ] Upload avatar lên Cloudinary thành công
- [ ] Avatar hiển thị đúng trên UI
- [ ] Delete avatar hoạt động
- [ ] Tất cả API test pass trong Postman
- [ ] Frontend forms validation đúng
- [ ] Database cập nhật đúng

---

**Team:** PMNM  
**Date:** 2024  
**Status:** ✅ READY FOR TESTING

**🚀 Happy Coding!**
