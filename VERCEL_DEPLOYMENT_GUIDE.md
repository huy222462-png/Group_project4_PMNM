# 🚀 HƯỚNG DẪN DEPLOY FRONTEND LÊN VERCEL (CHI TIẾT TỪNG BƯỚC)

## 📋 MỤC LỤC
1. [Chuẩn bị trước khi deploy](#chuẩn-bị-trước-khi-deploy)
2. [Bước 1: Đăng ký Vercel](#bước-1-đăng-ký-vercel)
3. [Bước 2: Import Project từ GitHub](#bước-2-import-project-từ-github)
4. [Bước 3: Cấu hình Project](#bước-3-cấu-hình-project)
5. [Bước 4: Thêm Environment Variables](#bước-4-thêm-environment-variables)
6. [Bước 5: Deploy](#bước-5-deploy)
7. [Bước 6: Lấy URL và test](#bước-6-lấy-url-và-test)
8. [Bước 7: Cập nhật CORS Backend](#bước-7-cập-nhật-cors-backend)
9. [Troubleshooting](#troubleshooting)

---

## ✅ CHUẨN BỊ TRƯỚC KHI DEPLOY

### Yêu cầu:
- ✅ Có tài khoản GitHub
- ✅ Code đã push lên GitHub repository: `Group_project4_PMNM`
- ✅ Backend đã deploy lên Render (có URL backend)
- ✅ Biết URL backend (VD: `https://pmnm-backend-group4.onrender.com`)

### Kiểm tra lần cuối:
```bash
# Mở terminal trong thư mục frontend
cd frontend

# Test build local
npm run build

# Nếu build thành công → OK!
# Nếu có lỗi → Fix trước khi deploy
```

---

## 🔰 BƯỚC 1: ĐĂNG KÝ VERCEL

### 1.1. Truy cập Vercel
```
URL: https://vercel.com
```

### 1.2. Đăng ký với GitHub
```
1. Click nút "Sign Up" (hoặc "Start Deploying")
2. Chọn: "Continue with GitHub"
3. Popup GitHub xuất hiện
4. Click "Authorize Vercel"
5. Nhập password GitHub nếu được yêu cầu
6. Xác nhận ủy quyền
```

### 1.3. Điền thông tin (nếu cần)
```
- Name: (Tên bạn)
- Team Name: (Tên nhóm hoặc để mặc định)
- Click "Continue"
```

### 1.4. Vào Dashboard
```
Sau khi đăng ký xong, bạn sẽ thấy Vercel Dashboard
```

---

## 📦 BƯỚC 2: IMPORT PROJECT TỪ GITHUB

### 2.1. Tạo Project mới
```
1. Vercel Dashboard → Click "Add New..."
2. Chọn: "Project"
   (hoặc click nút "+ New Project" ở góc phải)
```

### 2.2. Connect Git Repository
```
1. Tab "Import Git Repository" sẽ mở
2. Nếu chưa kết nối GitHub:
   - Click "Continue with GitHub"
   - Authorize Vercel (lần đầu)
   
3. Nếu đã kết nối:
   - Bạn sẽ thấy danh sách repositories
```

### 2.3. Tìm Repository
```
1. Tìm repository: "Group_project4_PMNM"
2. Nếu KHÔNG thấy repository:
   
   Option A: Adjust GitHub App Permissions
   - Click "Adjust GitHub App Permissions"
   - Chọn repository: "Group_project4_PMNM"
   - Click "Install" hoặc "Save"
   
   Option B: Import từ URL
   - Click "Import Third-Party Git Repository"
   - Paste URL: https://github.com/huy222462-png/Group_project4_PMNM
   - Click "Continue"
```

### 2.4. Import Repository
```
1. Tìm thấy "Group_project4_PMNM"
2. Click nút "Import" bên cạnh tên repo
```

---

## ⚙️ BƯỚC 3: CẤU HÌNH PROJECT

### 3.1. Configure Project Form
Sau khi click Import, bạn sẽ thấy form "Configure Project":

```
┌─────────────────────────────────────────────┐
│ Configure Project                            │
├─────────────────────────────────────────────┤
│ Project Name                                 │
│ ┌──────────────────────────────────────┐    │
│ │ group-project4-pmnm                  │    │
│ └──────────────────────────────────────┘    │
│ (Có thể đổi thành: pmnm-group4-frontend)    │
└─────────────────────────────────────────────┘
```

**Đổi Project Name (khuyến nghị):**
```
pmnm-group4-frontend
```

### 3.2. Framework Preset
```
┌─────────────────────────────────────────────┐
│ Framework Preset                             │
│ ┌──────────────────────────────────────┐    │
│ │ Create React App               [▼]   │    │
│ └──────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**Chọn:**
```
Create React App
```

**LƯU Ý:** Vercel tự động detect! Nếu đã chọn đúng → Để nguyên.

### 3.3. Root Directory
```
┌─────────────────────────────────────────────┐
│ Root Directory                               │
│ ┌──────────────────────────────────────┐    │
│ │ ./                             [Edit]│    │
│ └──────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**QUAN TRỌNG! Click "Edit":**
```
1. Click nút "Edit"
2. Chọn folder: "frontend"
3. Click "Continue"
```

**Kết quả:**
```
Root Directory: ./frontend
```

### 3.4. Build and Output Settings
```
┌─────────────────────────────────────────────┐
│ Build and Output Settings                    │
├─────────────────────────────────────────────┤
│ Build Command                                │
│ ┌──────────────────────────────────────┐    │
│ │ npm run build                        │    │
│ └──────────────────────────────────────┘    │
│                                              │
│ Output Directory                             │
│ ┌──────────────────────────────────────┐    │
│ │ build                                │    │
│ └──────────────────────────────────────┘    │
│                                              │
│ Install Command                              │
│ ┌──────────────────────────────────────┐    │
│ │ npm install                          │    │
│ └──────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

**Để nguyên mặc định:**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

---

## 🔐 BƯỚC 4: THÊM ENVIRONMENT VARIABLES

### 4.1. Mở phần Environment Variables
```
Kéo xuống dưới form "Configure Project"
Tìm mục: "Environment Variables"
```

### 4.2. Thêm biến REACT_APP_API_URL

```
┌─────────────────────────────────────────────┐
│ Environment Variables (Optional)             │
├─────────────────────────────────────────────┤
│                                              │
│ Key (Name)                                   │
│ ┌──────────────────────────────────────┐    │
│ │ REACT_APP_API_URL                    │    │
│ └──────────────────────────────────────┘    │
│                                              │
│ Value                                        │
│ ┌──────────────────────────────────────┐    │
│ │ https://pmnm-backend-group4.onrender │    │
│ │ .com                                 │    │
│ └──────────────────────────────────────┘    │
│                                              │
│ [Add]  (Biến sẽ tự động apply cho tất cả)   │
└─────────────────────────────────────────────┘
```

**Các bước:**

**Bước 4.2.1: Nhập Name**
```
Click vào ô "Name"
Gõ: REACT_APP_API_URL
```

**Bước 4.2.2: Nhập Value**
```
Click vào ô "Value"
Paste URL backend: https://pmnm-backend-group4.onrender.com
```

**⚠️ LƯU Ý QUAN TRỌNG:**
- ❌ **KHÔNG** thêm `/api` ở cuối
- ❌ **KHÔNG** thêm `/` ở cuối
- ✅ Chỉ URL gốc: `https://your-backend.onrender.com`

**Bước 4.2.3: Click "Add"**
```
Click nút "Add" (hoặc icon "+")
Biến sẽ tự động áp dụng cho TẤT CẢ environments (Production, Preview, Development)
```

**LƯU Ý:** Vercel mới không có checkbox chọn environment nữa, biến sẽ tự động apply cho tất cả!

### 4.3. Xác nhận biến đã thêm
```
Bạn sẽ thấy:
┌─────────────────────────────────────────────┐
│ REACT_APP_API_URL                            │
│ https://pmnm-backend-group4.onrender.com     │
│                                        [x]   │
└─────────────────────────────────────────────┘
```

---

## 🚀 BƯỚC 5: DEPLOY

### 5.1. Kiểm tra lại cấu hình

**Checklist cuối:**
- ✅ Project Name: `pmnm-group4-frontend`
- ✅ Framework: `Create React App`
- ✅ Root Directory: `./frontend`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `build`
- ✅ Environment Variables: `REACT_APP_API_URL` đã thêm

### 5.2. Click "Deploy"
```
Kéo xuống cuối form
Click nút "Deploy" (màu đen)
```

### 5.3. Theo dõi quá trình Build
```
Vercel sẽ chuyển sang trang "Deployment"
Bạn sẽ thấy:

Building...
├── Cloning repository...         ✓
├── Installing dependencies...    ✓
├── Running build command...      ⏳
└── Deploying...                  ⏳
```

**Thời gian:**
- Cloning: ~10 giây
- Installing: ~30-60 giây
- Building: ~1-2 phút
- Deploying: ~10 giây

**Tổng: 2-3 phút**

### 5.4. Đợi build hoàn tất
```
Khi thấy:
🎉 Congratulations! Your project has been deployed!

→ Deploy thành công! ✅
```

---

## 🌐 BƯỚC 6: LẤY URL VÀ TEST

### 6.1. Lấy URL Production
```
Sau khi deploy xong, bạn sẽ thấy:

┌─────────────────────────────────────────────┐
│ 🎉 Your project is live!                    │
├─────────────────────────────────────────────┤
│ https://pmnm-group4-frontend.vercel.app     │
│                                              │
│ [Visit]                                      │
└─────────────────────────────────────────────┘
```

**Copy URL này!**

**Ví dụ:**
```
https://pmnm-group4-frontend.vercel.app
```

### 6.2. Test Frontend
```
1. Click nút "Visit" hoặc mở URL trên trình duyệt
2. Kiểm tra:
   ✅ Giao diện Login/Signup hiển thị
   ✅ Không có lỗi trong Console (F12)
   ✅ Form đăng ký/đăng nhập hoạt động
```

### 6.3. Test kết nối API
```
1. Mở trang web
2. Nhấn F12 → Console
3. Gõ: console.log(process.env.REACT_APP_API_URL)
4. Nếu thấy URL backend → Biến môi trường OK! ✅
```

### 6.4. Test Signup/Login
```
1. Click "Đăng ký"
2. Nhập thông tin:
   - Name: Test User
   - Email: test@example.com
   - Password: 123456
3. Submit

Nếu thấy:
- ❌ CORS Error → Chưa cập nhật CLIENT_URL trên Render
- ✅ "Đăng ký thành công!" → Perfect!
```

---

## 🔗 BƯỚC 7: CẬP NHẬT CORS BACKEND

### 7.1. Quay lại Render Dashboard
```
1. Mở: https://dashboard.render.com
2. Vào Web Service: "pmnm-backend-group4"
```

### 7.2. Edit Environment Variables
```
1. Tab "Environment" ở sidebar trái
2. Tìm biến: CLIENT_URL
3. Click "Edit" (icon bút chì)
```

### 7.3. Cập nhật CLIENT_URL
```
Thay value cũ:
https://pmnm-group4.vercel.app

Bằng URL Vercel THẬT của bạn:
https://pmnm-group4-frontend.vercel.app
```

**⚠️ LƯU Ý:**
- ❌ KHÔNG có `/` ở cuối
- ✅ Copy chính xác từ Vercel

### 7.4. Save Changes
```
1. Click "Save Changes"
2. Backend sẽ tự động redeploy (1-2 phút)
3. Đợi status: "Live" → Xong!
```

### 7.5. Test lại Frontend
```
1. Quay lại frontend Vercel
2. Refresh page (Ctrl + Shift + R để clear cache)
3. Test signup/login lại
4. Nếu thành công → Hoàn tất! 🎉
```

---

## ✅ HOÀN TẤT!

### Kết quả:
```
✅ Frontend: https://pmnm-group4-frontend.vercel.app
✅ Backend:  https://pmnm-backend-group4.onrender.com
✅ CORS: Đã cấu hình đúng
✅ API: Kết nối thành công
```

### Tài liệu nộp thầy:
```
1. Link Frontend Vercel: https://pmnm-group4-frontend.vercel.app
2. Link Backend Render: https://pmnm-backend-group4.onrender.com
3. GitHub Repo: https://github.com/huy222462-png/Group_project4_PMNM
4. Tài khoản demo:
   Email: test@example.com
   Password: 123456
```

---

## 🐛 TROUBLESHOOTING (XỬ LÝ LỖI)

### ❌ Lỗi 1: Build Failed - "Cannot find module"

**Nguyên nhân:** Dependencies chưa đúng trong `package.json`

**Giải pháp:**
```bash
# Test build local trước
cd frontend
npm install
npm run build

# Nếu lỗi local → Fix package.json
# Sau đó push lại GitHub
git add .
git commit -m "fix: Update dependencies"
git push

# Vercel sẽ tự động redeploy
```

---

### ❌ Lỗi 2: "CORS Error" khi gọi API

**Nguyên nhân:** Backend `CLIENT_URL` chưa đúng

**Giải pháp:**
```
1. Render Dashboard → Environment
2. Kiểm tra CLIENT_URL = URL Vercel chính xác
3. Không có / ở cuối
4. Ví dụ đúng: https://pmnm-group4-frontend.vercel.app
5. Save → Đợi redeploy
```

---

### ❌ Lỗi 3: Environment Variable không hoạt động

**Nguyên nhân:** Vercel chưa rebuild với biến mới

**Giải pháp:**
```
1. Vercel Dashboard → Project
2. Settings → Environment Variables
3. Kiểm tra REACT_APP_API_URL có đúng không
4. Nếu sai → Edit → Save
5. Deployments → Latest Deployment → Redeploy
```

---

### ❌ Lỗi 4: Page Not Found (404)

**Nguyên nhân:** React Router chưa cấu hình SPA

**Giải pháp:**
```
Vercel tự động detect Create React App → Không cần config thêm

Nếu vẫn lỗi:
1. Tạo file: frontend/vercel.json
2. Nội dung:
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
3. Push lên GitHub
4. Vercel tự động redeploy
```

---

### ❌ Lỗi 5: Backend "Application failed to respond"

**Nguyên nhân:** Render Free tier đang sleep

**Giải pháp:**
```
1. Request đầu tiên mất 30-60 giây để wake up
2. Đợi 1 phút
3. Refresh lại frontend
4. Backend sẽ wake up và hoạt động bình thường
```

---

### ❌ Lỗi 6: Không kết nối được GitHub Repo

**Nguyên nhân:** Chưa authorize Vercel với GitHub

**Giải pháp:**
```
1. Vercel Dashboard → Add New Project
2. Click "Adjust GitHub App Permissions"
3. Select repositories: "Group_project4_PMNM"
4. Click "Install & Authorize"
5. Quay lại Vercel → Import repository
```

---

## 📊 SAU KHI DEPLOY

### 1. Monitor Deployments
```
Vercel Dashboard → Project → Deployments
- Xem lịch sử deploy
- Xem logs build
- Rollback nếu cần
```

### 2. Auto Deploy khi Push Code
```
Mặc định Vercel tự động deploy khi:
- Push code lên branch "Frontend-auth"
- Merge Pull Request
- Tạo tag mới

→ Không cần deploy thủ công lần sau!
```

### 3. View Logs
```
Vercel Dashboard → Project → Functions → Logs
- Xem real-time logs
- Debug lỗi runtime
```

### 4. Custom Domain (Optional)
```
Nếu có domain riêng:
1. Settings → Domains
2. Add Domain
3. Update DNS records theo hướng dẫn
```

---

## 💡 TIPS & TRICKS

### 1. Preview Deployments
```
Mỗi Pull Request tự động tạo preview URL
→ Test trước khi merge vào production
```

### 2. Environment Variables per Branch
```
Settings → Environment Variables
→ Có thể set biến khác nhau cho:
  - Production (branch main)
  - Preview (PR, feature branches)
  - Development (local)
```

### 3. Build Performance
```
Nếu build chậm:
1. Settings → General → Build & Development Settings
2. Bật "Enable Turbo" (beta feature)
```

### 4. Analytics
```
Settings → Analytics
→ Xem traffic, performance của website
```

---

## 📞 LIÊN HỆ & HỖ TRỢ

### Nếu cần hỗ trợ:
- 📧 Email: support@vercel.com
- 📚 Docs: https://vercel.com/docs
- 💬 Discord: https://vercel.com/discord

### Tài liệu tham khảo:
- [Vercel Deployment Docs](https://vercel.com/docs/deployments/overview)
- [Environment Variables Guide](https://vercel.com/docs/environment-variables)
- [Create React App on Vercel](https://vercel.com/guides/deploying-react-with-vercel)

---

## 🎯 CHECKLIST CUỐI CÙNG

### Trước khi nộp bài:
- [ ] Frontend deploy thành công trên Vercel
- [ ] Backend deploy thành công trên Render
- [ ] CORS đã cấu hình đúng (CLIENT_URL)
- [ ] Environment variables đã thêm đầy đủ
- [ ] Test signup/login thành công
- [ ] Test xem danh sách user
- [ ] Test upload avatar (nếu có Cloudinary)
- [ ] Test forgot password
- [ ] URL frontend hoạt động: `https://your-project.vercel.app`
- [ ] URL backend hoạt động: `https://your-backend.onrender.com/api/profile`

---

**🎉 CHÚC BẠN DEPLOY THÀNH CÔNG! 🎉**

Nếu gặp bất kỳ lỗi nào, hãy xem phần Troubleshooting hoặc hỏi tôi!
