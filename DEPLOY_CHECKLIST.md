# ✅ DEPLOYMENT CHECKLIST - Làm từng bước

## 📋 CHUẨN BỊ (5 phút)

### 1. Tài khoản cần có:
- [ ] GitHub account (đã có ✅)
- [ ] MongoDB Atlas account → https://cloud.mongodb.com
- [ ] Render account → https://render.com
- [ ] Vercel account → https://vercel.com
- [ ] Cloudinary account (nếu dùng upload ảnh) → https://cloudinary.com

---

## 🗄️ BƯỚC 1: MongoDB Atlas (10 phút)

### Setup Database:
- [ ] 1.1 Đăng ký/Login MongoDB Atlas
- [ ] 1.2 Create New Cluster (FREE tier)
  - Region: Singapore hoặc Tokyo
  - Cluster Name: Group4-PMNM
- [ ] 1.3 Network Access → Add IP → Allow from Anywhere (0.0.0.0/0)
- [ ] 1.4 Database Access → Add User:
  - Username: `pmnm_user`
  - Password: `(tạo password mạnh và lưu lại)`
- [ ] 1.5 Connect → Drivers → Copy Connection String:
  ```
  mongodb+srv://pmnm_user:<password>@cluster0.xxxxx.mongodb.net/pmnm_db
  ```
- [ ] 1.6 Thay `<password>` bằng password thật → Lưu lại!

**Connection String mẫu:**
```
mongodb+srv://pmnm_user:MySecretPass123@cluster0.ab1cd.mongodb.net/pmnm_db?retryWrites=true&w=majority
```

---

## 🔙 BƯỚC 2: Deploy Backend lên Render (15 phút)

### 2.1 Đăng ký Render:
- [ ] Truy cập: https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize Render

### 2.2 Tạo Web Service:
- [ ] Dashboard → New → Web Service
- [ ] Connect repository: `Group_project4_PMNM`
- [ ] Configure:
  - Name: `pmnm-backend`
  - Region: `Singapore`
  - Branch: `Frontend-auth`
  - Root Directory: `backend`
  - Runtime: `Node`
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Instance Type: `Free`

### 2.3 Environment Variables:
Click **"Advanced"** → Add các biến sau:

```env
PORT=5000

MONGODB_URI=mongodb+srv://pmnm_user:MySecretPass123@cluster0.ab1cd.mongodb.net/pmnm_db?retryWrites=true&w=majority

JWT_SECRET=pmnm-secret-key-2025-very-strong-password-change-this

EMAIL_TEST_MODE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-16-chars

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

CLIENT_URL=https://pmnm-group4.vercel.app
```

**LƯU Ý:** CLIENT_URL sẽ cập nhật lại sau khi có URL Vercel!

- [ ] 2.4 Click **"Create Web Service"**
- [ ] 2.5 Đợi deploy xong (3-5 phút)
- [ ] 2.6 Copy URL backend: `https://pmnm-backend.onrender.com`
- [ ] 2.7 Test: Mở `https://pmnm-backend.onrender.com/api/profile`
  - Nếu thấy `401 Unauthorized` → Backend OK! ✅

---

## 🎨 BƯỚC 3: Deploy Frontend lên Vercel (10 phút)

### 3.1 Đăng ký Vercel:
- [ ] Truy cập: https://vercel.com
- [ ] Sign up with GitHub
- [ ] Authorize Vercel

### 3.2 Import Project:
- [ ] Dashboard → Add New → Project
- [ ] Import: `Group_project4_PMNM`
- [ ] Configure:
  - Framework: `Create React App`
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `build`

### 3.3 Environment Variables:
Add biến:
```env
REACT_APP_API_URL=https://pmnm-backend.onrender.com
```

*Thay URL bằng URL backend thật từ Render!*

- [ ] 3.4 Click **"Deploy"**
- [ ] 3.5 Đợi build xong (2-3 phút)
- [ ] 3.6 Copy URL frontend: `https://pmnm-group4.vercel.app`

---

## 🔗 BƯỚC 4: Kết nối Frontend - Backend (5 phút)

### Cập nhật CORS:
- [ ] 4.1 Quay lại Render Dashboard
- [ ] 4.2 Vào service `pmnm-backend`
- [ ] 4.3 Environment → Edit
- [ ] 4.4 Cập nhật `CLIENT_URL`:
  ```
  CLIENT_URL=https://pmnm-group4.vercel.app
  ```
  *(Thay bằng URL Vercel thật!)*
- [ ] 4.5 Save Changes
- [ ] 4.6 Backend sẽ tự động redeploy (1-2 phút)

---

## ✅ BƯỚC 5: Test toàn bộ hệ thống (10 phút)

### 5.1 Test Frontend:
- [ ] Mở: `https://pmnm-group4.vercel.app`
- [ ] Giao diện hiển thị OK

### 5.2 Test Signup:
- [ ] Click "Đăng ký"
- [ ] Nhập thông tin:
  - Name: Test User
  - Email: test@example.com
  - Password: 123456
- [ ] Submit → Thành công!

### 5.3 Test Login:
- [ ] Click "Đăng nhập"
- [ ] Email: test@example.com
- [ ] Password: 123456
- [ ] Login thành công → Redirect về Home

### 5.4 Test User List:
- [ ] Trang Home hiển thị danh sách user
- [ ] Thấy user `test@example.com` vừa tạo

### 5.5 Test Upload Avatar:
- [ ] Click vào avatar trên Navbar
- [ ] Chọn ảnh → Upload
- [ ] Avatar cập nhật thành công

### 5.6 Test Forgot Password:
- [ ] Logout
- [ ] Click "Quên mật khẩu"
- [ ] Nhập email: test@example.com
- [ ] Nếu `EMAIL_TEST_MODE=true`:
  - Check Render logs để xem token
  - Copy token
  - Truy cập: `https://pmnm-group4.vercel.app/reset-password/<token>`
  - Đặt password mới → Thành công!

---

## 📊 KẾT QUẢ CUỐI CÙNG

### URLs của bạn:
```
✅ Frontend:  https://pmnm-group4.vercel.app
✅ Backend:   https://pmnm-backend.onrender.com
✅ Database:  MongoDB Atlas Cluster
```

### Thông tin login demo:
```
Email: test@example.com
Password: (password bạn vừa tạo)
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### Lỗi 1: Frontend không gọi được API
**Nguyên nhân:** CORS hoặc API URL sai

**Giải pháp:**
1. Check `REACT_APP_API_URL` trong Vercel có đúng không
2. Check `CLIENT_URL` trong Render có đúng không
3. Redeploy cả Frontend và Backend
4. Clear cache browser: Ctrl + Shift + R

### Lỗi 2: Backend không kết nối MongoDB
**Nguyên nhân:** Connection string sai hoặc Network Access

**Giải pháp:**
1. Check `MONGODB_URI` trong Render
2. Check MongoDB Atlas → Network Access → 0.0.0.0/0
3. Check Database User password
4. Test connection string bằng MongoDB Compass

### Lỗi 3: Upload avatar lỗi
**Nguyên nhân:** Cloudinary credentials sai

**Giải pháp:**
1. Check 3 biến: `CLOUDINARY_CLOUD_NAME`, `API_KEY`, `API_SECRET`
2. Đăng nhập Cloudinary dashboard để lấy lại credentials
3. Cập nhật trong Render Environment
4. Redeploy backend

### Lỗi 4: Render Free tier sleep
**Nguyên nhân:** Free tier sleep sau 15 phút không hoạt động

**Giải pháp:**
1. Request đầu tiên sẽ mất 30-60s để wake up
2. Sử dụng UptimeRobot để ping mỗi 14 phút
3. Hoặc nâng cấp lên paid plan

---

## 📝 LƯU Ý QUAN TRỌNG

### Bảo mật:
- ⚠️ **KHÔNG** commit file `.env` lên GitHub
- ✅ Chỉ commit `.env.example`
- ✅ JWT_SECRET phải mạnh trong production
- ✅ MongoDB password phải phức tạp

### Performance:
- 🔄 Render Free tier: Backend sleep sau 15 phút
- ⚡ Vercel: Luôn nhanh, không sleep
- 📦 MongoDB Free tier: 512MB storage

### Monitoring:
- 📊 Render Dashboard → Logs (Xem lỗi backend)
- 📊 Vercel Dashboard → Deployments (Xem lỗi frontend)
- 📊 MongoDB Atlas → Metrics (Xem database usage)

---

## 🎯 NEXT STEPS SAU KHI DEPLOY

### 1. Setup Custom Domain (Optional):
- [ ] Mua domain từ Namecheap/GoDaddy
- [ ] Vercel Settings → Domains → Add
- [ ] Update DNS records

### 2. Enable HTTPS:
- [ ] Vercel tự động có SSL ✅
- [ ] Render tự động có SSL ✅

### 3. Setup CI/CD:
- [ ] Auto deploy khi push code
- [ ] Vercel: Tự động ✅
- [ ] Render: Tự động ✅

### 4. Monitor & Analytics:
- [ ] Google Analytics cho frontend
- [ ] LogRocket cho error tracking
- [ ] Sentry cho bug tracking

---

**Hoàn thành deployment! 🎉**

Giờ bạn có thể chia sẻ link cho giáo viên demo!

**Demo URL:** https://pmnm-group4.vercel.app
