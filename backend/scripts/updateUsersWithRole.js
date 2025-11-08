import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Script để update tất cả users không có role thành "user"
const updateUsersWithRole = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Update all users without role field
    const result = await User.updateMany(
      { role: { $exists: false } }, // Tìm users không có field role
      { $set: { role: "user" } }     // Set role = "user"
    );

    console.log(`✅ Updated ${result.modifiedCount} users with role="user"`);

    // Show all users with their roles
    const users = await User.find({}, "name email role");
    console.log("\n📋 All users:");
    users.forEach(user => {
      console.log(`- ${user.email}: role="${user.role || 'MISSING'}"`);
    });

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

updateUsersWithRole();
