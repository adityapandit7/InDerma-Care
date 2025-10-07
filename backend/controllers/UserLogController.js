const UserLog = require("../models/UserLog");

exports.createUserLog = async (req, res) => {
  try {
    const { headquarters, address, hospital, doctor, geoLocation } = req.body;

    const log = new UserLog({
      user: req.user.id,
      headquarters,
      address,
      hospital,
      doctor,
      geoLocation
    });

    await log.save();
    res.json({ message: "User log saved successfully", log });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
