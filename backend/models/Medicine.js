const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String, // store image URL/path
});

module.exports = mongoose.model("Medicine", medicineSchema);
