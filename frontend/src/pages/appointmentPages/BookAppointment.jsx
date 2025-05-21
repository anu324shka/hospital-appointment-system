import { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Paper } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import NavbarPatient from "../../components/NavbarPatient";

export default function BookAppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: "", datetime: null });

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors/all", { credentials: "include" })
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/appointments/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        doctorId: form.doctorId,
        date: form.datetime.format("YYYY-MM-DD"),
        time: form.datetime.format("HH:mm"),
      }),
    });
    if (res.ok) alert("Appointment booked!");
    else alert("Time slot conflict or error!");
  };

  return (
    <>
      <NavbarPatient />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e0f2f1, #b2dfdb)",
          px: 2,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Book an Appointment
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              label="Select Doctor"
              name="doctorId"
              value={form.doctorId}
              onChange={(e) =>
                setForm({ ...form, doctorId: e.target.value })
              }
              sx={{ my: 2 }}
            >
              {doctors.map((doc) => (
                <MenuItem key={doc._id} value={doc._id}>
                  {doc.name}
                </MenuItem>
              ))}
            </TextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Select Date & Time"
                value={form.datetime}
                onChange={(newValue) => setForm({ ...form, datetime: newValue })}
                minDateTime={dayjs()}
                sx={{ my: 2, width: "100%" }}
              />
            </LocalizationProvider>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1 }}
            >
              Book Appointment
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
