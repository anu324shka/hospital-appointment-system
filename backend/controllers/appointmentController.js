const Appointment = require("../models/Appointment");

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const exists = await Appointment.findOne({ doctor: doctorId, date, time });
    if (exists) return res.status(400).json({ message: "Time slot already booked" });

    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user._id,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    
    if (
      appointment.patient.toString() !== req.user._id.toString() &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "patient") filter.patient = req.user._id;
    else if (req.user.role === "doctor") filter.doctor = req.user._id;

    const appointments = await Appointment.find(filter)
      .populate("doctor", "name email")
      .populate("patient", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
