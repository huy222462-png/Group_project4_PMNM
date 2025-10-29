const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

// 🟢 Thêm dòng này để in ra MONGO_URI (debug)
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

// 🟢 Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
