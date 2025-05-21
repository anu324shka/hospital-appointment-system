import { Button, TextField, Typography, Box, MenuItem, Paper, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const meRes = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
      });

      if (meRes.ok) {
        const { role } = await meRes.json();
        if (role === "doctor") navigate("/doctor/dashboard");
        else if (role === "patient") navigate("/patient/dashboard");
      } else {
        alert("Could not fetch user role");
      }
    } else {
      alert("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0f2f1, #b2dfdb)",
        px: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            sx={{ my: 2 }}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            sx={{ my: 2 }}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            sx={{ my: 2 }}
            onChange={handleChange}
          />
          <TextField
            select
            label="Role"
            name="role"
            fullWidth
            sx={{ my: 2 }}
            value={form.role}
            onChange={handleChange}
          >
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="doctor">Doctor</MenuItem>
          </TextField>
          <Button variant="contained" type="submit" fullWidth>
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
