# 🏥 hospital-appointment-system

A MERN Stack (MongoDB, Express, React, Node.js) based Hospital Appointment Management System with role-based access for **Patients**, **Doctors**, and **Admin**. Supports secure authentication, booking, and management of appointments.

---

## 🚀 Features
- 🔐 Role-Based Authentication (Patient / Doctor / Admin)
- 👤 Profile Management with Change Password & Delete Account
- 📆 Book Appointments with Conflict Check
- 📋 View & Delete Own Appointments
- 👨‍⚕️ Doctor Listing with Booking Flow
- 🧑‍⚕️ Doctor Dashboard: View Own Appointments
- 🧑‍💼 Admin Panel (Password Protected Route)
  - View All Doctors
  - View All Patients
  - View All Appointments

---

## 🛠️ Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Material UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Tools**: Postman, MongoDB Atlas, Git, Dotenv, cors

## ⚙️ How to Run
### 📦 Backend Setup
cd backend
npm install
npm start
Server runs on: http://localhost:5000

### 🌐 Frontend Setup
cd frontend
npm install
npm run dev
Frontend runs on: http://localhost:5173

These are set using environment variables in .env.

## 🔑 .env Format (for backend)
Create a .env file inside backend/:
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
ADMIN_USERNAME=
ADMIN_PASSWORD=

## 📡 API Endpoints
### 🔐 Auth Routes
POST /api/auth/register – Register new user
POST /api/auth/login – Login user
GET /api/auth/me – Get logged-in user profile
PUT /api/auth/change-password – Change user password
DELETE /api/auth/delete – Delete user account

### 🩺 Doctor Routes
GET /api/doctors – Get all doctors
GET /api/doctors/:id – Get doctor by ID

### 📅 Appointment Routes
GET /api/appointments – Get all appointments for logged-in user (doctor/patient)
POST /api/appointments – Book new appointment
DELETE /api/appointments/:id – Delete an appointment

### 🧑‍💼 Admin Routes
POST /api/admin/login – Admin login
GET /api/admin/doctors – Get all doctors
GET /api/admin/patients – Get all patients
GET /api/admin/appointments – Get all appointments


![appoitments](https://github.com/user-attachments/assets/31ee936b-bfd5-4731-8e39-56a2d49bc385)
![book-appointment](https://github.com/user-attachments/assets/31783b82-32bb-4c5a-af95-3d308f8f6141)
![change-password](https://github.com/user-attachments/assets/f6d95442-e62e-4c3c-b33f-886e5e2c92a2)
![delete-account](https://github.com/user-attachments/assets/f30621b0-d81b-4efe-a98d-c78bd357696d)
![home page - guest users](https://github.com/user-attachments/assets/4e979dcc-8237-47df-9b4c-8169d3305574)
![login-user](https://github.com/user-attachments/assets/da2acff9-e972-4b07-bfbd-9cca8e603bd8)
![patient-dashboard](https://github.com/user-attachments/assets/74010250-71c5-4b57-a0c9-3643276c1be2)
![register-user](https://github.com/user-attachments/assets/d01df64b-9a65-41e4-9d8a-9af3bab5e62d)
