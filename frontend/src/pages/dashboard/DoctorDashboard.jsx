import { useEffect, useState } from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import NavbarDoctor from "../../components/NavbarDoctor";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, []);

  return (
    <>
      <NavbarDoctor />
      <Box sx={{ py: 5, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4">Welcome, Dr. {doctor.name}</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                This is your personalized dashboard where you can view and manage all your scheduled appointments.
              </Typography>
              <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                You have {appointments.length} upcoming appointment(s).
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="https://img.freepik.com/free-vector/doctor-consultation-illustration_23-2148889145.jpg"
                   alt="Doctor"
                   width="100%" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>Next Appointment:</Typography>
        {appointments.length > 0 ? (
          <Paper sx={{ p: 3 }}>
            <Typography>Patient: {appointments[0].patientName}</Typography>
            <Typography>Date: {appointments[0].date}</Typography>
            <Typography>Time: {appointments[0].time}</Typography>
          </Paper>
        ) : (
          <Typography>No appointments scheduled.</Typography>
        )}
      </Container>
    </>
  );
}
