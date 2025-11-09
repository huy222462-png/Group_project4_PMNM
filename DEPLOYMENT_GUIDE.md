# 🚀 HƯỚNG DẪN DEPLOY FULL PROJECT

## 📋 Tổng quan

Dự án sẽ được deploy trên 3 platform:
- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com) hoặc Railway (https://railway.app)
- **Database**: MongoDB Atlas (https://cloud.mongodb.com)

---

## 🗄️ BƯỚC 1: Setup MongoDB Atlas

### 1.1 Tạo tài khoản và Cluster
```bash
1. Truy cập: https://cloud.mongodb.com
2. Đăng ký/Đăng nhập
3. Create New Cluster (chọn FREE tier)
4. Chọn region gần nhất (Singapore, Tokyo)
5. Cluster Name: Group4-PMNM
```

### 1.2 Cấu hình Network Access
```bash
1. Security → Network Access
2. Click "Add IP Address"
3. Chọn "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm
```

### 1.3 Tạo Database User
```bash
1. Security → Database Access
2. Add New Database User
   - Username: pmnm_user
   - Password: (tạo password mạnh)
   - Database User Privileges: Read and write to any database
3. Add User
```

### 1.4 Lấy Connection String
```bash
1. Databases → Connect
2. Chọn "Connect your application"
3. Driver: Node.js
4. Copy connection string:
   mongodb+srv://pmnm_user:<password>@cluster0.xxxxx.mongodb.net/pmnm_db?retryWrites=true&w=majority
5. Thay <password> bằng password thật
```

---

## 🔙 BƯỚC 2: Deploy Backend lên Render

### 2.1 Chuẩn bị Code
```bash
# Đảm bảo đã commit tất cả thay đổi
git add .
git commit -m "feat: Prepare for deployment"
git push origin Frontend-auth
```

### 2.2 Đăng ký Render
```bash
1. Truy cập: https://render.com
2. Sign up with GitHub
3. Authorize Render to access GitHub
```

### 2.3 Tạo Web Service
```bash
1. Dashboard → New → Web Service
2. Connect Repository: Group_project4_PMNM
3. Cấu hình:
   - Name: pmnm-backend
   - Region: Singapore
   - Branch: Frontend-auth
   - Root Directory: backend
   - Runtime: Node
   - Build Command: npm install
   - Start Command: npm start
   - Instance Type: Free
```

### 2.4 Thêm Environment Variables
```bash
Click "Advanced" → Add Environment Variable:

PORT=5000

MONGODB_URI=mongodb+srv://pmnm_user:your-password@cluster0.xxxxx.mongodb.net/pmnm_db?retryWrites=true&w=majority

JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2025

EMAIL_TEST_MODE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

CLIENT_URL=https://your-project.vercel.app
```

### 2.5 Deploy
```bash
1. Click "Create Web Service"
2. Đợi Render build và deploy (3-5 phút)
3. Lấy URL: https://pmnm-backend.onrender.com
```

### 2.6 Test Backend
```bash
# Test health check
curl https://pmnm-backend.onrender.com/api/profile

# Nếu trả về 401 Unauthorized → Backend OK!
```

---

## 🎨 BƯỚC 3: Deploy Frontend lên Vercel

### 3.1 Chuẩn bị Frontend
```bash
# Tạo file .env.production trong frontend/
cd frontend
```

Tạo file `.env.production`:
```env
REACT_APP_API_URL=https://pmnm-backend.onrender.com
```

```bash
# Commit
git add .
git commit -m "feat: Add production env"
git push origin Frontend-auth
```

### 3.2 Đăng ký Vercel
```bash
1. Truy cập: https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel
```

### 3.3 Import Project
```bash
1. Dashboard → Add New → Project
2. Import Git Repository: Group_project4_PMNM
3. Cấu hình:
   - Framework Preset: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build
   - Install Command: npm install
```

### 3.4 Environment Variables
```bash
Add Environment Variable:

REACT_APP_API_URL=https://pmnm-backend.onrender.com
```

### 3.5 Deploy
```bash
1. Click "Deploy"
2. Đợi build (2-3 phút)
3. Lấy URL: https://pmnm-group4.vercel.app
```

---

## 🔗 BƯỚC 4: Kết nối Frontend - Backend

### 4.1 Cập nhật CORS trên Backend
```bash
1. Vào Render Dashboard
2. Environment → Edit
3. Cập nhật CLIENT_URL:
   CLIENT_URL=https://pmnm-group4.vercel.app
4. Save Changes
5. Backend sẽ tự động redeploy
```

### 4.2 Test kết nối
```bash
1. Mở: https://pmnm-group4.vercel.app
2. Click "Đăng ký"
3. Nhập thông tin → Submit
4. Nếu thành công → Hệ thống hoạt động!
```

---

## 🚂 OPTION: Deploy Backend lên Railway (Thay vì Render)

### 1. Đăng ký Railway
```bash
1. Truy cập: https://railway.app
2. Sign in with GitHub
```

### 2. New Project
```bash
1. Dashboard → New Project
2. Deploy from GitHub repo
3. Chọn: Group_project4_PMNM
4. Chọn branch: Frontend-auth
```

### 3. Cấu hình
```bash
Railway tự detect Node.js

Settings → Variables → Add:
- MONGODB_URI
- JWT_SECRET
- EMAIL_TEST_MODE
- EMAIL_USER
- EMAIL_PASS
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLIENT_URL
```

### 4. Deploy
```bash
1. Railway tự động build
2. Generate Domain → Lấy URL
3. Copy URL: https://pmnm-backend.up.railway.app
```

---

## ✅ BƯỚC 5: Kiểm tra toàn bộ hệ thống

### Checklist:
- [ ] MongoDB Atlas: Cluster đang chạy
- [ ] Backend (Render/Railway): Service đang chạy
- [ ] Frontend (Vercel): App đang chạy
- [ ] Signup: Tạo user thành công
- [ ] Login: Đăng nhập thành công
- [ ] User List: Hiển thị danh sách
- [ ] Upload Avatar: Upload ảnh thành công
- [ ] Forgot Password: Nhận email reset (nếu dùng EMAIL_TEST_MODE=false)

---

## 📊 Kết quả cuối cùng

### URLs:
```
Frontend:  https://pmnm-group4.vercel.app
Backend:   https://pmnm-backend.onrender.com
Database:  MongoDB Atlas Cluster
```

### Test full flow:
```bash
1. Mở frontend URL
2. Đăng ký tài khoản mới
3. Login
4. Xem danh sách user
5. Upload avatar
6. Test forgot password
7. Logout
```

---

## 🐛 Troubleshooting

### Lỗi CORS:
```bash
✅ Check CLIENT_URL trong backend env
✅ Redeploy backend sau khi thay đổi env
```

### Backend không kết nối MongoDB:
```bash
✅ Check MONGODB_URI có đúng format
✅ Check Network Access: 0.0.0.0/0
✅ Check Database User password
```

### Frontend không gọi được API:
```bash
✅ Check REACT_APP_API_URL trong Vercel
✅ Rebuild frontend sau khi thay đổi env
✅ Check backend có đang chạy (Render/Railway)
```

### Cloudinary upload lỗi:
```bash
✅ Check 3 biến: CLOUD_NAME, API_KEY, API_SECRET
✅ Restart backend
```

---

## 💰 Chi phí

### Free Tier:
- **MongoDB Atlas**: 512MB free
- **Render**: 750 giờ/tháng free
- **Railway**: $5 credit/tháng
- **Vercel**: Unlimited free cho personal projects
- **Cloudinary**: 25GB storage, 25GB bandwidth/tháng

### Lưu ý:
- Render Free tier: Service sleep sau 15 phút không hoạt động
- Railway: Hết credit thì dừng service
- Vercel: Unlimited build time

---

## 📝 Next Steps

### Sau khi deploy xong:

1. **Test toàn bộ chức năng**
2. **Tạo tài liệu API** (Swagger/Postman)
3. **Setup CI/CD** (Auto deploy khi push code)
4. **Monitor logs** (Render/Railway dashboard)
5. **Setup custom domain** (nếu có)

---

**Hoàn thành deployment! 🎉**

Hệ thống giờ đã chạy online, có thể demo cho giáo viên!
