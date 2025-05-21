import { Box, Typography, Button, Container, Grid, Paper } from "@mui/material";
import GuestNavbar from "../components/GuestNavbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/check-auth", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          navigate("/"); 
        }
      });
  }, []);

  return (
    <>
      <GuestNavbar />
      <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Book Your Doctor's Appointment Online
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                Welcome to HealthPlus – a fast, secure, and user-friendly platform to schedule your appointments with certified doctors in just a few clicks.
              </Typography>
              <Button variant="contained" size="large" onClick={() => navigate("/register")}>
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <img src="https://img.freepik.com/free-vector/medical-appointment-booking-healthcare-online-service-patient-doctor-clinic-checkup-using-smartphone-application-digital-healthcare-technology_335657-2361.jpg"
                   alt="Hospital"
                   width="100%" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Why Choose HealthPlus?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Easy Booking", desc: "Schedule appointments with just a few clicks." },
            { title: "Verified Doctors", desc: "Consult with certified and experienced doctors." },
            { title: "24/7 Access", desc: "Book anytime from anywhere." }
          ].map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.desc}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
