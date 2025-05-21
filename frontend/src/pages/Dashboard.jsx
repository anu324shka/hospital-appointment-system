import { useEffect, useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
    });
    navigate("/login");
  };

  return user ? (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome, {user.name}</Typography>
      <Typography variant="subtitle1">Role: {user.role}</Typography>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>Logout</Button>
    </Box>
  ) : (
    <div>Loading...</div>
  );
}
