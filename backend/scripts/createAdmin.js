import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const adminEmail = "admin@example.com";
    const adminPassword = "admin123";

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("⚠️  Admin already exists:", adminEmail);
      console.log("📝 Updating to admin role...");
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("✅ Updated to admin role");
    } else {
      // Create new admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new User({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        avatar: ""
      });

      await admin.save();
      console.log("✅ Admin created successfully!");
    }

    console.log("\n📋 Admin Credentials:");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("\n⚠️  IMPORTANT: Login with these credentials to test admin panel");

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

createAdmin();
