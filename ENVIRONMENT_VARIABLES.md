# 🔐 BIẾN MÔI TRƯỜNG CHO DEPLOYMENT

## 📋 MỤC LỤC
1. [Backend - Render](#backend---render)
2. [Frontend - Vercel](#frontend---vercel)
3. [MongoDB Atlas](#mongodb-atlas)
4. [Cloudinary](#cloudinary)

---

## 🔙 BACKEND - RENDER

### Copy từng dòng này vào Render Environment Variables:

#### **Key-Value Format (Copy từng cặp):**

```
PORT
5000
```

```
MONGODB_URI
mongodb+srv://pmnm_admin:Pmnm2025Strong@group4-cluster.mongodb.net/pmnm_db?retryWrites=true&w=majority
```

```
JWT_SECRET
pmnm-group4-jwt-secret-key-2025-production-very-strong-password-change-this-in-production
```

```
EMAIL_TEST_MODE
true
```

```
EMAIL_USER
your-email@gmail.com
```

```
EMAIL_PASS
your-gmail-app-password-16-chars
```

```
CLOUDINARY_CLOUD_NAME
your-cloudinary-cloud-name
```

```
CLOUDINARY_API_KEY
your-cloudinary-api-key
```

```
CLOUDINARY_API_SECRET
your-cloudinary-api-secret
```

```
CLIENT_URL
https://pmnm-group4.vercel.app
```

---

### **Hoặc định dạng .env (để tham khảo):**

```env
PORT=5000
MONGODB_URI=mongodb+srv://pmnm_admin:Pmnm2025Strong@group4-cluster.mongodb.net/pmnm_db?retryWrites=true&w=majority
JWT_SECRET=pmnm-group4-jwt-secret-key-2025-production-very-strong-password-change-this-in-production
EMAIL_TEST_MODE=true
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password-16-chars
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
CLIENT_URL=https://pmnm-group4.vercel.app
```

---

### 📝 **HƯỚNG DẪN THAY ĐỔI:**

#### 1. **MONGODB_URI** (QUAN TRỌNG!)
Thay bằng connection string thật từ MongoDB Atlas:

**Bước lấy:**
```
1. MongoDB Atlas → Database → Connect → Drivers
2. Copy: mongodb+srv://pmnm_admin:<password>@cluster0.xxxxx.mongodb.net/
3. Thay <password> bằng password thật
4. Thêm /pmnm_db trước ?retryWrites
```

**Ví dụ thật:**
```
mongodb+srv://pmnm_admin:MyPassword123@cluster0.ab1cd.mongodb.net/pmnm_db?retryWrites=true&w=majority
```

#### 2. **JWT_SECRET** (Nên thay đổi!)
Tạo chuỗi ngẫu nhiên dài và mạnh:

**Cách tạo:**
```bash
# Cách 1: Dùng PowerShell
-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_})

# Cách 2: Tự nghĩ chuỗi dài
pmnm-group4-production-secret-2025-very-strong-random-key
```

#### 3. **EMAIL_USER & EMAIL_PASS** (Nếu muốn gửi email thật)

**Lấy Gmail App Password:**
```
1. Google Account → Security → 2-Step Verification (bật lên)
2. App Passwords → Select app: Mail
3. Generate → Copy password 16 ký tự (VD: abcd efgh ijkl mnop)
```

**Cập nhật:**
```
EMAIL_TEST_MODE=false
EMAIL_USER=your-real-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

**Nếu muốn dùng Test Mode (khuyến nghị):**
```
EMAIL_TEST_MODE=true
EMAIL_USER=any@email.com
EMAIL_PASS=any-password
```

#### 4. **CLOUDINARY_*** (Lấy từ Cloudinary Dashboard)

**Bước lấy:**
```
1. Truy cập: https://cloudinary.com/console
2. Dashboard → Account Details
3. Copy:
   - Cloud Name: dxxxxxxx
   - API Key: 123456789012345
   - API Secret: AbCdEfGhIjKlMnOpQrStUvWxYz123
```

**Cập nhật:**
```
CLOUDINARY_CLOUD_NAME=dxxxxxxx
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz123
```

#### 5. **CLIENT_URL** (Cập nhật SAU khi deploy frontend)

**Bước cập nhật:**
```
1. Deploy frontend lên Vercel trước
2. Lấy URL: https://your-project.vercel.app
3. Quay lại Render → Environment → Edit CLIENT_URL
4. Paste URL Vercel vào
5. Save → Backend tự động redeploy
```

---

## 🎨 FRONTEND - VERCEL

### Copy biến này vào Vercel Environment Variables:

#### **Key-Value Format:**

```
REACT_APP_API_URL
https://pmnm-backend-group4.onrender.com
```

---

### **Hoặc định dạng .env:**

```env
REACT_APP_API_URL=https://pmnm-backend-group4.onrender.com
```

---

### 📝 **HƯỚNG DẪN THAY ĐỔI:**

#### **REACT_APP_API_URL** (QUAN TRỌNG!)
Thay bằng URL backend thật từ Render:

**Bước lấy:**
```
1. Deploy backend lên Render trước
2. Render Dashboard → Web Service
3. Copy URL: https://pmnm-backend-group4.onrender.com
4. Paste vào Vercel Environment Variables
```

**Ví dụ thật:**
```
REACT_APP_API_URL=https://pmnm-backend-group4.onrender.com
```

**LƯU Ý:**
- ❌ KHÔNG có `/api` ở cuối
- ❌ KHÔNG có `/` ở cuối
- ✅ Chỉ URL gốc: https://your-backend.onrender.com

---

## 🗄️ MONGODB ATLAS

### Connection String Template:

```
mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

### Thông tin cần điền:

| Phần | Giá trị mẫu | Giá trị thật của bạn |
|------|-------------|----------------------|
| `<username>` | pmnm_admin | _(username bạn tạo)_ |
| `<password>` | Pmnm2025Strong | _(password bạn tạo)_ |
| `<cluster-url>` | cluster0.ab1cd.mongodb.net | _(từ MongoDB Atlas)_ |
| `<database>` | pmnm_db | pmnm_db |

### Ví dụ hoàn chỉnh:

```
mongodb+srv://pmnm_admin:Pmnm2025Strong@cluster0.ab1cd.mongodb.net/pmnm_db?retryWrites=true&w=majority
```

---

## ☁️ CLOUDINARY

### Lấy thông tin từ Dashboard:

```
1. Truy cập: https://cloudinary.com/console
2. Login → Dashboard
3. Copy thông tin:
```

| Key | Value mẫu | Vị trí lấy |
|-----|-----------|------------|
| Cloud Name | `dxxxxxxx` | Dashboard → Cloud Name |
| API Key | `123456789012345` | Dashboard → API Key |
| API Secret | `AbCdEfGhIjKlMnOpQrStUvWxYz123` | Dashboard → API Secret |

### **Lưu ý:**
- ⚠️ **API Secret** rất quan trọng, KHÔNG share công khai!
- ✅ Nếu không có Cloudinary, upload avatar sẽ không hoạt động
- ✅ Free tier: 25GB storage + 25GB bandwidth/tháng

---

## 📋 CHECKLIST TRIỂN KHAI

### ✅ **Trước khi deploy:**

- [ ] Đã tạo MongoDB Atlas cluster
- [ ] Đã lấy được MongoDB connection string
- [ ] Đã tạo Cloudinary account (nếu cần upload ảnh)
- [ ] Đã có Gmail App Password (nếu muốn gửi email thật)
- [ ] Đã push code lên GitHub

### ✅ **Khi deploy Backend (Render):**

- [ ] Đã thêm 10 environment variables
- [ ] `MONGODB_URI` đã thay password thật
- [ ] `JWT_SECRET` đã thay chuỗi mạnh
- [ ] `CLIENT_URL` tạm thời để: https://pmnm-group4.vercel.app
- [ ] Build thành công, không có lỗi
- [ ] Test: https://your-backend.onrender.com/api/profile → thấy "No token provided"

### ✅ **Khi deploy Frontend (Vercel):**

- [ ] Đã thêm `REACT_APP_API_URL` với URL backend thật
- [ ] Build thành công
- [ ] Truy cập URL frontend thấy giao diện

### ✅ **Sau khi deploy cả 2:**

- [ ] Quay lại Render, cập nhật `CLIENT_URL` với URL Vercel thật
- [ ] Backend redeploy xong
- [ ] Test signup → login → xem user list
- [ ] Test upload avatar (nếu có Cloudinary)
- [ ] Test forgot password

---

## 🎯 COPY NHANH

### **BACKEND RENDER (10 biến):**

```plaintext
PORT = 5000
MONGODB_URI = <thay-bằng-connection-string-thật>
JWT_SECRET = pmnm-group4-jwt-secret-key-2025-production
EMAIL_TEST_MODE = true
EMAIL_USER = your-email@gmail.com
EMAIL_PASS = your-gmail-app-password
CLOUDINARY_CLOUD_NAME = <thay-bằng-cloud-name-thật>
CLOUDINARY_API_KEY = <thay-bằng-api-key-thật>
CLOUDINARY_API_SECRET = <thay-bằng-api-secret-thật>
CLIENT_URL = <thay-bằng-url-vercel-sau-khi-deploy-frontend>
```

### **FRONTEND VERCEL (1 biến):**

```plaintext
REACT_APP_API_URL = <thay-bằng-url-render-sau-khi-deploy-backend>
```

---

## 🔒 BẢO MẬT

### ⚠️ **KHÔNG BAO GIỜ:**
- ❌ Commit file `.env` lên GitHub
- ❌ Share `JWT_SECRET` công khai
- ❌ Share `CLOUDINARY_API_SECRET` công khai
- ❌ Share `MONGODB_URI` với password thật
- ❌ Share `EMAIL_PASS` (Gmail App Password)

### ✅ **NÊN:**
- ✅ Dùng `.env.example` để lưu template
- ✅ Thêm `.env` vào `.gitignore`
- ✅ Dùng biến môi trường khác nhau cho dev/production
- ✅ Thay `JWT_SECRET` định kỳ
- ✅ Dùng `EMAIL_TEST_MODE=true` khi dev

---

## 📞 HỖ TRỢ

### Nếu gặp lỗi:

1. **CORS Error:**
   - Check `CLIENT_URL` trên Render = URL Vercel
   - Không có `/` ở cuối URL

2. **Cannot connect MongoDB:**
   - Check `MONGODB_URI` có đúng format
   - Check MongoDB Atlas → Network Access → 0.0.0.0/0
   - Check password không có ký tự đặc biệt cần encode

3. **API 500 Error:**
   - Xem Render Logs để biết lỗi cụ thể
   - Kiểm tra từng biến môi trường đã đúng chưa

4. **Upload ảnh lỗi:**
   - Check 3 biến Cloudinary đã điền đúng
   - Login Cloudinary Dashboard kiểm tra lại credentials

---

**Chúc bạn deploy thành công! 🚀**

Nếu cần hỗ trợ thêm, hãy liên hệ!
