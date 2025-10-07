const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addMedicine,
  removeMedicine,
  getAllUserLogs,
  getAllMedicines
} = require("../controllers/adminController");

// Only admin can access these routes
router.use(auth(["admin"]));

router.post("/medicines", addMedicine); // add a medicine
router.delete("/medicines/:id", removeMedicine); // delete a medicine
router.get("/medicines", getAllMedicines); // list all medicines
router.get("/userlogs", getAllUserLogs); // list all employee logs

module.exports = router;
