const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  datetime: { type: Date, default: Date.now },
  headquarters: { type: String, required: true },
  address: { type: String, required: true },
  hospital: { type: String, required: true },
  doctor: { type: String, required: true },
  geoLocation: {
    lat: Number,
    lon: Number
  }
});

module.exports = mongoose.model("UserLog", userLogSchema);
