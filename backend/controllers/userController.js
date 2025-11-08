// ✅ Import các thư viện cần thiết
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Import routes (nếu bạn đặt file routes là user.js)
const userRoutes = require('./routes/user');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Định tuyến API chuẩn nhóm
app.use('/api', userRoutes);

// ✅ Debug: in ra URI kết nối
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

// ✅ Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Chạy server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));