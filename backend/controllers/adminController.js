const Medicine = require("../models/medicine");
const UserLog = require("../models/UserLog");

// Add a new medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const med = new Medicine({ name, description, price, image });
    await med.save();
    res.json({ message: "Medicine added successfully", med });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a medicine by ID
exports.removeMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    await Medicine.findByIdAndDelete(id);
    res.json({ message: "Medicine removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all employee logs
exports.getAllUserLogs = async (req, res) => {
  try {
    const logs = await UserLog.find().populate("user", "name email");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
