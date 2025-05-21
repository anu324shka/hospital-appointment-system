import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

export default function NavbarPatient() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">
          🏥 HealthPlus
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/patient/appointments")}>Appointments</Button>
          <Button color="inherit" onClick={() => navigate("/patient/book-appointment")}>Book Appointments</Button>
          <Button color="inherit"><ProfileMenu /></Button>
        </Box>
      </Toolbar>
    </AppBar>   
  );
}
