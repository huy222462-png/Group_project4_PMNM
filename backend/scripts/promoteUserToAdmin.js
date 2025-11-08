import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const promoteToAdmin = async (email) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    if (!email || email === "your@email.com") {
      console.log("\n⚠️  Usage: node promoteUserToAdmin.js <email>");
      console.log("Example: node promoteUserToAdmin.js admin@example.com\n");
      
      // Show all users
      const users = await User.find({}, "name email role");
      console.log("📋 Available users:");
      users.forEach(u => {
        console.log(`  - ${u.email} (${u.role})`);
      });
      
      await mongoose.disconnect();
      process.exit(0);
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`\n❌ User not found: ${email}`);
      console.log("Available users:");
      const users = await User.find({}, "email");
      users.forEach(u => console.log(`  - ${u.email}`));
      await mongoose.disconnect();
      process.exit(1);
    }

    if (user.role === "admin") {
      console.log(`\nℹ️  User is already admin: ${email}`);
      console.log(`Name: ${user.name}`);
      console.log(`Role: ${user.role}`);
    } else {
      const oldRole = user.role;
      user.role = "admin";
      await user.save();
      console.log(`\n✅ SUCCESS! User promoted to admin`);
      console.log(`Email: ${email}`);
      console.log(`Name: ${user.name}`);
      console.log(`Old role: ${oldRole}`);
      console.log(`New role: ${user.role}`);
      console.log(`\n⚠️  IMPORTANT: User must logout and login again to get new token with admin role!`);
    }

    await mongoose.disconnect();
    console.log("\n✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
};

// Get email from command line argument
const emailToPromote = process.argv[2];
promoteToAdmin(emailToPromote);
