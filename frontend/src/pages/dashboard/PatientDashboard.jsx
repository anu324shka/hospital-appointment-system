import { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Button, Paper } from "@mui/material";
import NavbarPatient from "../../components/NavbarPatient";
import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {
  const [patient, setPatient] = useState({});
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setPatient(data));
  }, []);

  return (
    <>
      <NavbarPatient />
      <Box sx={{ py: 5, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Welcome, {patient.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Manage your health easily by scheduling appointments with top doctors.
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                {appointments.length > 0
                  ? `You have ${appointments.length} scheduled appointment(s).`
                  : "You have no appointments yet."}
              </Typography>
              {appointments.length === 0 && (
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/patient/book-appointment")}>
                  Schedule Appointment
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-6246.jpg"
                   alt="Patient"
                   width="100%" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {appointments.length > 0 && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Upcoming Appointment:</Typography>
          <Paper sx={{ p: 3 }}>
            <Typography>Doctor: {appointments[0].doctorName}</Typography>
            <Typography>Date: {appointments[0].date}</Typography>
            <Typography>Time: {appointments[0].time}</Typography>
          </Paper>
        </Container>
      )}
    </>
  );
}
