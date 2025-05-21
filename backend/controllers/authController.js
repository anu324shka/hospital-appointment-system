const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    const token = createToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      })
      .json({ message: "Registered", user: { name, email, role } });
  } catch (err) {
    res.status(400).json({ message: "User already exists or invalid data" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      })
      .json({ message: "Logged in", user: { name: user.name, email: user.email, role: user.role } });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

exports.getMe = (req, res) => {
  const { name, email, role } = req.user;
  res.json({ name, email, role });
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(400).json({ message: "Old password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: "Password updated" });
  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie("token").json({ message: "Account deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting account" });
  }
};
