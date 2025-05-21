const express = require("express");
const router = express.Router();
const {
  bookAppointment,
  deleteAppointment,
  getAppointments,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/book", protect, bookAppointment);
router.delete("/:id", protect, deleteAppointment);
router.get("/my", protect, getAppointments);

module.exports = router;