const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  changePassword, 
  deleteAccount
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.post("/change-password", protect, changePassword);
router.delete("/delete", protect, deleteAccount);
router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (token) return res.json({ authenticated: true });
  res.json({ authenticated: false });
});

module.exports = router;
