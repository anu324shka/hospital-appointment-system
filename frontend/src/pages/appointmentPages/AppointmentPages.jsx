import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import NavbarDoctor from "../../components/NavbarDoctor";
import NavbarPatient from "../../components/NavbarPatient";

export default function AppointmentsPage({ role }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/appointments/my", {
      credentials: "include",
    });
    const data = await res.json();
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmDelete) return;

    const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      alert("Appointment deleted");
      fetchAppointments();
    } else {
      alert("Error deleting appointment");
    }
  };

  return (
    <>
      {role === "doctor" ? <NavbarDoctor /> : <NavbarPatient />}
      <Box
        sx={{
          minHeight: "100vh",
          p: 3,
          background: "linear-gradient(to right, #f5f5f5, #e0f7fa)",
        }}
      >
        <Paper elevation={4} sx={{ maxWidth: 700, mx: "auto", p: 3 }}>
          <Typography variant="h5" align="center" gutterBottom>
            My Appointments
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : appointments.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No appointments found.
            </Typography>
          ) : (
            <List>
              {appointments.map((app) => (
                <div key={app._id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(app._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={
                        role === "doctor"
                          ? `Patient: ${app.patient?.name}`
                          : `Doctor: ${app.doctor?.name}`
                      }
                      secondary={`Date: ${app.date} | Time: ${app.time}`}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </>
  );
}
