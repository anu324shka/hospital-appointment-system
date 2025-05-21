import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function NavbarDoctor() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" onClick={() => navigate("/")}>🩺 HealthPlus</Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/doctor/appointments")}>Appointments</Button>
          <Button color="inherit"><ProfileMenu /></Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
