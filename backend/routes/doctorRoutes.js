const express = require("express");
const router = express.Router();
const { getDoctors } = require("../controllers/doctorController");

router.get("/all", getDoctors); 

module.exports = router;