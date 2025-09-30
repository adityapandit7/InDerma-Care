require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      email: "admin@example.com",
      password: hashedPassword ,
      role: "admin"
    });

    await admin.save();
    console.log("✅ Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    console.log("Admin created:", {
  email: admin.email,
  password: admin.password, // should look hashed (a long string with $2a$…)
  role: admin.role
});

    process.exit(1);
  }
};

createAdmin();
