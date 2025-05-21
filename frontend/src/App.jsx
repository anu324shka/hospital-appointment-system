import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Register from "./pages/register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import BookAppointment from "./pages/appointmentPages/BookAppointment.jsx";
import AppointmentsPage from "./pages/appointmentPages/AppointmentPages.jsx";
import AdminDashboard from "./admin/pages/Dashboard.jsx";
import AdminLogin from "./admin/Login.jsx";
import DoctorsList from "./admin/pages/DoctorsList.jsx";
import PatientsList from "./admin/pages/PatientsList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/patient/book-appointment" element={<BookAppointment />} />
        <Route path="/patient/appointments" element={<AppointmentsPage role="patient" />} />
        <Route path="/doctor/appointments" element={<AppointmentsPage role="doctor" />} />        
      </Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/doctors" element={<DoctorsList />} />
        <Route path="/admin/patients" element={<PatientsList />} />
    </Routes>
  );
}
