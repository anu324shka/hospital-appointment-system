import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GuestNavbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🏥 HealthPlus
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
