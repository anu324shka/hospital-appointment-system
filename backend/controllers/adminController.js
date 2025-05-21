const User = require("../models/User");

exports.loginAdmin = (req, res) => {
  res.json({ message: "Admin logged in successfully" });
};

exports.getAllDoctors = async (req, res) => {
  const doctors = await User.find({ role: "doctor" }).select("-password");
  res.json(doctors);
};

exports.getAllPatients = async (req, res) => {
  const patients = await User.find({ role: "patient" }).select("-password");
  res.json(patients);
};