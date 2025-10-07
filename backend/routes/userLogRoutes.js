const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const UserLog = require("../models/UserLog");

// Create User Log (already existing)
router.post("/", auth(["admin", "employee"]), async (req, res) => {
  try {
    const { headquarters, address, hospital, doctor, geoLocation } = req.body;

    const log = new UserLog({
      user: req.user.id,
      headquarters,
      address,
      hospital,
      doctor,
      geoLocation,
    });

    await log.save();
    res.json({ message: "User log saved successfully", log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all logs (Admin only)
router.get("/all", auth(["admin"]), async (req, res) => {
  try {
    const logs = await UserLog.find().populate("user", "name email");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
