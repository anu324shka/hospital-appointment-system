const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  getAllDoctors,
  getAllPatients,
} = require("../controllers/adminController");
const { adminProtect } = require("../middleware/adminAuth");

router.post("/login", adminProtect, loginAdmin);
router.get("/doctors", getAllDoctors);
router.get("/patients", getAllPatients);

module.exports = router;
