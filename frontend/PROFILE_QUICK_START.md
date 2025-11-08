# 🚀 QUICK START - PROFILE PAGE

## ⚡ Chạy ứng dụng

### 1. Start Backend
```bash
cd backend
node server.js
```
✅ Server chạy tại: `http://localhost:5000`

### 2. Start Frontend
```bash
cd frontend
npm start
```
✅ App chạy tại: `http://localhost:3000`

---

## 🎯 Sử dụng Profile Page

### Bước 1: Đăng nhập
1. Mở `http://localhost:3000/login`
2. Đăng nhập với tài khoản của bạn
3. Hoặc đăng ký tài khoản mới tại `/signup`

### Bước 2: Vào Profile
1. Click nút **"Profile"** trên Navbar
2. Hoặc truy cập trực tiếp: `http://localhost:3000/profile`

### Bước 3: Xem thông tin (View Profile)
- Xem avatar (hoặc placeholder)
- Xem name, email
- Xem ngày tạo tài khoản

### Bước 4: Cập nhật thông tin (Edit Profile)
1. Click **"Edit Profile"**
2. Sửa name, email, hoặc avatar URL
3. Click **"Save Changes"**
4. Thấy message "Profile updated successfully!"

### Bước 5: Đổi mật khẩu (Change Password)
1. Click **"Change Password"**
2. Nhập:
   - Current Password
   - New Password (min 6 chars)
   - Confirm New Password
3. Click **"Change Password"**
4. Thấy message "Password changed successfully!"

---

## 📸 Screenshots Preview

### View Mode
```
┌─────────────────────────────────┐
│         My Profile              │
├─────────────────────────────────┤
│         [Avatar]                │
│                                 │
│  Name:      John Doe            │
│  Email:     john@example.com    │
│  Avatar:    https://...         │
│  Member:    November 8, 2025    │
│                                 │
│  [Edit Profile] [Change Pwd]    │
└─────────────────────────────────┘
```

### Edit Mode
```
┌─────────────────────────────────┐
│       Edit Profile              │
├─────────────────────────────────┤
│  Name *                         │
│  [John Doe              ]       │
│                                 │
│  Email *                        │
│  [john@example.com      ]       │
│                                 │
│  Avatar URL                     │
│  [https://...           ]       │
│  [Preview Avatar Image]         │
│                                 │
│  [Save Changes]  [Cancel]       │
└─────────────────────────────────┘
```

### Change Password Mode
```
┌─────────────────────────────────┐
│     Change Password             │
├─────────────────────────────────┤
│  Current Password *             │
│  [••••••••••••          ]       │
│                                 │
│  New Password *                 │
│  [••••••••••••          ]       │
│                                 │
│  Confirm New Password *         │
│  [••••••••••••          ]       │
│                                 │
│  [Change Password]  [Cancel]    │
└─────────────────────────────────┘
```

---

## ✅ Features Checklist

### View Profile
- ✅ Auto-load profile data
- ✅ Display avatar (or placeholder)
- ✅ Display name, email
- ✅ Display member since date
- ✅ Loading state

### Update Profile
- ✅ Edit name
- ✅ Edit email
- ✅ Edit avatar URL
- ✅ Avatar preview
- ✅ Validation (name/email required)
- ✅ Success message
- ✅ Error handling
- ✅ Cancel button

### Change Password
- ✅ Verify current password
- ✅ Min length validation (6 chars)
- ✅ Password confirmation
- ✅ Success message
- ✅ Error handling
- ✅ Cancel button
- ✅ Clear form after success

---

## 🎨 UI Features

- ✅ Modern gradient background (purple theme)
- ✅ Clean white card design
- ✅ Smooth animations
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Loading states
- ✅ Auto-dismiss messages (3s)
- ✅ Disabled buttons when loading

---

## 🧪 Test với Sample Data

### Test Avatar URLs
```
https://i.pravatar.cc/150?img=1
https://i.pravatar.cc/150?img=2
https://ui-avatars.com/api/?name=John+Doe&size=150
https://randomuser.me/api/portraits/men/1.jpg
https://randomuser.me/api/portraits/women/1.jpg
```

### Test Update Flow
1. Login: `test@example.com` / `password123`
2. Go to Profile
3. Edit Profile:
   - Name: `Updated Name`
   - Email: `updated@example.com`
   - Avatar: `https://i.pravatar.cc/150?img=3`
4. Save → See success message
5. Refresh page → Data persisted

### Test Change Password
1. Change Password:
   - Current: `password123`
   - New: `newPassword123`
   - Confirm: `newPassword123`
2. Save → See success message
3. Logout
4. Login with new password → Success

---

## 🔗 Routes

### Public Routes
- `/login` - Login page
- `/signup` - Signup page

### Protected Routes (Require login)
- `/` - Home page
- `/profile` - Profile page ⭐

---

## 🐛 Common Issues

### "Failed to load profile"
**Cause:** Backend not running or user not logged in
**Fix:** 
- Start backend: `cd backend && node server.js`
- Check login status
- Check token in localStorage

### "Invalid token"
**Cause:** Token expired or invalid
**Fix:** Logout and login again

### Avatar not showing
**Cause:** Invalid URL
**Fix:** Use valid image URL (https://...)

### "Email already in use"
**Cause:** Email belongs to another user
**Fix:** Use different email

---

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Full layout)
- **Tablet**: 768px (Adjusted spacing)
- **Mobile**: < 480px (Stacked layout)

---

## 💾 Data Persistence

### LocalStorage
- `token` - JWT token
- `user` - User object

### After Update
- Profile data → Saved to database
- User object → Updated in localStorage
- AuthContext → Synced automatically

---

## 🎯 Navigation Flow

```
Login → Home
         ↓
     [Profile Button]
         ↓
   Profile Page (View Mode)
         ↓
   [Edit Profile] → Edit Mode → [Save] → View Mode ✅
         ↓                         ↓
   [Change Pwd] → Pwd Mode → [Change] → View Mode ✅
```

---

## 📊 Files Created

```
frontend/
├── src/
│   ├── components/
│   │   └── Profile.jsx          ⭐ NEW
│   ├── styles/
│   │   └── Profile.css          ⭐ NEW
│   ├── App.jsx                  ✏️ UPDATED (added route)
│   └── components/
│       └── Navbar.jsx           ✏️ UPDATED (added link)
└── PROFILE_FRONTEND_DOCUMENTATION.md  📖 NEW
```

---

## ✨ Next Steps

1. ✅ Backend API running
2. ✅ Frontend app running
3. ✅ Login to account
4. ✅ Test Profile page
5. ✅ Test Update profile
6. ✅ Test Change password

**Enjoy your Profile page! 🎉**
