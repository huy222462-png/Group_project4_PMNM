# 🚀 PROFILE API - QUICK REFERENCE

## API Endpoints

### 📥 GET /api/profile
```http
GET /api/profile
Authorization: Bearer <token>
```
**Response:**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "...", "email": "...", "avatar": "..." }
}
```

### 📤 PUT /api/profile
```http
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",              // Optional
  "email": "new@example.com",      // Optional
  "avatar": "https://...",         // Optional
  "currentPassword": "old123",     // Required for password change
  "newPassword": "new123"          // Optional
}
```
**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { "_id": "...", "name": "...", "email": "...", "avatar": "..." }
}
```

---

## ⚡ Quick Start

### 1. Start Server
```bash
cd backend
npm install
npm run dev
```

### 2. Test with cURL
```bash
# Login first
TOKEN=$(curl -s -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.token')

# Get profile
curl -X GET http://localhost:5000/api/profile \
  -H "Authorization: Bearer $TOKEN"

# Update profile
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'
```

### 3. Run Automated Tests
```bash
node test-profile-api.js
```

---

## 🔍 Validation Quick Check

| Field | Rule | Error Message |
|-------|------|---------------|
| name | Not empty | "Name cannot be empty" |
| email | Valid format | "Invalid email format" |
| email | Unique | "Email already in use" |
| currentPassword | Required for pwd change | "Current password is required to set new password" |
| currentPassword | Must match | "Current password is incorrect" |
| newPassword | Min 6 chars | "New password must be at least 6 characters" |

---

## 🎯 Common Use Cases

### Update only name
```json
{ "name": "John Doe" }
```

### Update only email
```json
{ "email": "john@example.com" }
```

### Update name and email
```json
{ 
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Change password
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

### Update everything
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "avatar": "https://example.com/avatar.jpg",
  "currentPassword": "oldPassword123",
  "newPassword": "newPassword123"
}
```

---

## 🐛 Error Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success |
| 400 | ❌ Validation Error |
| 401 | ❌ Not Authenticated |
| 404 | ❌ User Not Found |
| 500 | ❌ Server Error |

---

## 📂 Files

| File | Purpose |
|------|---------|
| `controllers/userController.js` | Main implementation |
| `routes/index.js` | Route definitions |
| `middleware/authMiddleware.js` | JWT authentication |
| `test-profile-api.js` | Automated tests |
| `Profile_API.postman_collection.json` | Postman collection |
| `README_PROFILE_API.md` | Full documentation |
| `PROFILE_API_DOCUMENTATION.md` | API specification |

---

## 💡 Pro Tips

1. **Token Management**: Token auto-expires after 1 day
2. **Email Format**: Auto-converts to lowercase
3. **Name Trimming**: Auto-removes leading/trailing spaces
4. **Password Security**: Auto-hashed with bcrypt
5. **Partial Updates**: Only send fields you want to update
6. **Error Details**: Check response message for specific error info

---

## 🔗 Quick Links

- Full Docs: `README_PROFILE_API.md`
- API Spec: `PROFILE_API_DOCUMENTATION.md`
- Run Tests: `node test-profile-api.js`
- Postman: Import `Profile_API.postman_collection.json`

---

**Last Updated**: November 2025
