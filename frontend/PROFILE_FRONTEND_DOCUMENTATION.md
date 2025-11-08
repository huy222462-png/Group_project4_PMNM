# 🎨 PROFILE PAGE - FRONTEND DOCUMENTATION

## 📋 Tổng quan

Trang Profile cho phép người dùng:
- ✅ **Xem thông tin cá nhân** (View Profile)
- ✅ **Cập nhật thông tin** (name, email, avatar)
- ✅ **Đổi mật khẩu** (Change Password)

## 🚀 Files Đã Tạo

### 1. Components
- ✅ **`src/components/Profile.jsx`** - Main profile component
  - View mode: Hiển thị thông tin user
  - Edit mode: Form cập nhật thông tin
  - Change password mode: Form đổi mật khẩu

### 2. Styles
- ✅ **`src/styles/Profile.css`** - Profile styling
  - Responsive design
  - Animations và transitions
  - Modern UI với gradient background

### 3. Updated Files
- ✅ **`src/App.jsx`** - Thêm route `/profile`
- ✅ **`src/components/Navbar.jsx`** - Thêm link Profile button

## 🎯 Tính năng chính

### 1. View Profile (Xem thông tin)
**Hiển thị:**
- Avatar (hoặc placeholder với chữ cái đầu của tên)
- Name
- Email
- Avatar URL
- Member Since (ngày tạo tài khoản)

**Actions:**
- Nút "Edit Profile" - Chuyển sang edit mode
- Nút "Change Password" - Chuyển sang change password mode

### 2. Update Profile (Cập nhật thông tin)
**Form fields:**
- Name (required)
- Email (required)
- Avatar URL (optional)

**Features:**
- ✅ Validation input
- ✅ Preview avatar khi nhập URL
- ✅ Real-time error messages
- ✅ Success message sau khi update
- ✅ Auto-update user data trong AuthContext
- ✅ Cancel button để quay lại view mode

**Validation:**
- Name không được empty
- Email phải đúng format
- Avatar URL phải là URL hợp lệ (nếu có)

### 3. Change Password (Đổi mật khẩu)
**Form fields:**
- Current Password (required)
- New Password (required, min 6 characters)
- Confirm New Password (required, must match)

**Features:**
- ✅ Verify current password
- ✅ Min length validation cho new password
- ✅ Password confirmation matching
- ✅ Real-time error messages
- ✅ Success message sau khi đổi password
- ✅ Clear form sau khi thành công
- ✅ Cancel button để quay lại view mode

## 📱 UI/UX Features

### Design
- Modern gradient background (purple theme)
- Clean white card với shadow
- Smooth animations và transitions
- Responsive design (mobile-friendly)

### User Experience
- Loading states khi fetch/update data
- Success/Error messages với auto-dismiss (3 seconds)
- Disabled buttons khi đang loading
- Avatar preview khi nhập URL
- Placeholder avatar với initial letter

### Responsive
- Desktop: Full features với spacing rộng
- Tablet: Adjusted layout
- Mobile: Stack layout, optimized spacing

## 🔧 Technical Details

### State Management
```javascript
// Profile data
const [profileData, setProfileData] = useState(null);

// Modes
const [isEditing, setIsEditing] = useState(false);
const [isChangingPassword, setIsChangingPassword] = useState(false);

// Form data
const [formData, setFormData] = useState({...});
const [passwordData, setPasswordData] = useState({...});

// UI states
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState({type: '', text: ''});
```

### API Integration
```javascript
// Fetch profile
const response = await authAPI.getProfile();

// Update profile
const response = await authAPI.updateProfile({
  name, email, avatar
});

// Change password
const response = await authAPI.updateProfile({
  currentPassword, newPassword
});
```

### AuthContext Integration
```javascript
const { user, updateUser } = useAuth();

// Update user in context after successful update
updateUser(response.data);
```

## 🎨 CSS Classes

### Main Layout
- `.profile-container` - Outer container với gradient background
- `.profile-card` - White card container
- `.profile-title` - Page title

### View Mode
- `.profile-view` - View mode container
- `.profile-avatar` - Avatar container
- `.avatar-placeholder` - Placeholder khi không có avatar
- `.profile-info` - Info section
- `.info-row` - Each info row
- `.profile-actions` - Action buttons

### Edit Mode
- `.profile-form` - Form container
- `.form-group` - Form field group
- `.avatar-preview` - Avatar preview
- `.form-actions` - Form buttons

### Components
- `.btn` - Base button class
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-cancel` - Cancel button
- `.message` - Message display
- `.message.success` - Success message
- `.message.error` - Error message

## 🚀 Cách sử dụng

### 1. Start Frontend
```bash
cd frontend
npm install
npm start
```

### 2. Truy cập Profile
- Đăng nhập vào hệ thống
- Click nút "Profile" trên Navbar
- Hoặc truy cập: `http://localhost:3000/profile`

### 3. View Profile
- Tự động load thông tin user khi vào trang
- Hiển thị avatar, name, email, member since

### 4. Edit Profile
- Click "Edit Profile"
- Sửa name, email, avatar URL
- Click "Save Changes" hoặc "Cancel"

### 5. Change Password
- Click "Change Password"
- Nhập current password, new password, confirm password
- Click "Change Password" hoặc "Cancel"

## 📋 Testing Checklist

### View Profile
- [ ] Profile loads automatically khi vào trang
- [ ] Hiển thị đúng name, email
- [ ] Avatar hiển thị (hoặc placeholder)
- [ ] Member since hiển thị đúng format
- [ ] Loading state khi fetch data

### Edit Profile
- [ ] Click "Edit Profile" → Chuyển sang edit mode
- [ ] Form pre-filled với data hiện tại
- [ ] Update name → Success
- [ ] Update email → Success
- [ ] Update avatar URL → Success, show preview
- [ ] Empty name → Error message
- [ ] Invalid email → Error message
- [ ] Click "Cancel" → Quay lại view mode
- [ ] After update → Data refresh, show success message

### Change Password
- [ ] Click "Change Password" → Chuyển sang password mode
- [ ] Empty current password → Error
- [ ] Wrong current password → Error message
- [ ] New password < 6 chars → Error message
- [ ] Passwords don't match → Error message
- [ ] Valid inputs → Success, clear form
- [ ] Click "Cancel" → Quay lại view mode

### UI/UX
- [ ] Responsive trên mobile, tablet, desktop
- [ ] Animations smooth
- [ ] Loading states hiển thị đúng
- [ ] Messages auto-dismiss sau 3s
- [ ] Buttons disabled khi loading
- [ ] Avatar preview hoạt động

## 🐛 Error Handling

### API Errors
```javascript
try {
  const response = await authAPI.getProfile();
  // Handle success
} catch (error) {
  setMessage({
    type: 'error',
    text: error.response?.data?.message || 'Failed to load profile'
  });
}
```

### Validation Errors
- Empty name → "Name cannot be empty"
- Empty email → "Email cannot be empty"
- Invalid email → "Invalid email format"
- Empty current password → "Current password is required"
- Password < 6 chars → "New password must be at least 6 characters"
- Passwords mismatch → "Passwords do not match"

### Network Errors
- Connection refused → Auto-redirect to login (via axios interceptor)
- 401 Unauthorized → Auto-redirect to login
- 500 Server error → Show error message

## 💡 Tips

### 1. Avatar URLs
Để test avatar, có thể dùng các URL sau:
- `https://i.pravatar.cc/150?img=1`
- `https://ui-avatars.com/api/?name=John+Doe&size=150`
- `https://randomuser.me/api/portraits/men/1.jpg`

### 2. Testing Flow
1. Login với tài khoản
2. Vào Profile page
3. Test view → edit → update
4. Test change password
5. Logout và login lại với password mới

### 3. State Persistence
- User data được lưu trong AuthContext
- Sau khi update, data tự động sync với localStorage
- Refresh page → Data vẫn còn (từ localStorage)

## 🔗 Navigation

### Navbar Links (Khi đã login)
- **Trang chủ** → `/`
- **Profile** → `/profile` (NEW)
- **Đăng xuất** → Logout và redirect về `/login`

### Protected Route
```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
```

## 📊 Component Structure

```
Profile.jsx
├── State Management
│   ├── profileData (from API)
│   ├── formData (edit mode)
│   ├── passwordData (password mode)
│   ├── isEditing
│   ├── isChangingPassword
│   ├── loading
│   └── message
├── Effects
│   └── useEffect → fetchProfile()
├── Handlers
│   ├── handleInputChange
│   ├── handlePasswordChange
│   ├── handleUpdateProfile
│   ├── handleChangePassword
│   ├── handleCancelEdit
│   └── handleCancelPasswordChange
└── Render
    ├── Loading State
    ├── View Mode
    ├── Edit Mode
    └── Change Password Mode
```

## 🎯 Integration Points

### With Backend
- **GET** `/api/profile` → Load profile data
- **PUT** `/api/profile` → Update profile
- **PUT** `/api/profile` (with password fields) → Change password

### With AuthContext
- `user` → Current user data
- `updateUser()` → Update user after profile change

### With Routing
- `/profile` → Protected route
- Navbar → Profile link

---

## ✅ Summary

**Hoàn thành:**
- ✅ Profile component với 3 modes (view/edit/change password)
- ✅ Full validation và error handling
- ✅ Responsive design
- ✅ Integration với backend API
- ✅ AuthContext sync
- ✅ Modern UI/UX

**Routes:**
- ✅ `/profile` - Protected route

**Features:**
- ✅ View profile information
- ✅ Update name, email, avatar
- ✅ Change password
- ✅ Avatar preview
- ✅ Real-time validation
- ✅ Success/Error messages

**Sinh viên 2 (Nguyễn Võ Khánh Huy)**: Trang Profile (React) - View & Update Profile ✅

---

**Last Updated**: November 2025
