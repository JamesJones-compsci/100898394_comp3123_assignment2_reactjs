# COMP3123 Assignment 2 – Employee Management System

This is a full-stack MERN application for managing employees. Users can **sign up, log in, and add employees with profile images**.  

---

## Features

- User registration & login with JWT  
- Add, update, delete employees  
- Upload employee profile images  
- Dashboard to view all employees  

---

## Tech Stack

- **Frontend:** React.js, Material UI, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer  
- **Auth:** JWT  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## Project Structure

frontend/
src/pages/Signup.js, Login.js, Dashboard.js
src/api/axiosConfig.js

backend/
server.js
routes/authRoutes.js, employeeRoutes.js
controllers/userController.js, employeeController.js
middleware/authMiddleware.js
uploads/ (images)
config/db.js

yaml
Copy code

---

## Setup

1. Clone the repo and install dependencies:  
```bash
cd backend
npm install
cd ../frontend
npm install
Set environment variables:

Backend (.env)

ini
Copy code
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
Frontend (.env)

bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the app locally:

bash
Copy code
# Backend
cd backend
npm start

# Frontend
cd frontend
npm start
Frontend: http://localhost:3000
Backend: http://localhost:5000/api

Deployment
Frontend: Vercel (REACT_APP_API_URL=<backend_url>/api)

Backend: Render (set PORT, MONGO_URI, JWT_SECRET)

Usage
Signup and login at the frontend.

Access the dashboard to add employees and upload profile images.

Employees stored in MongoDB; images in backend/uploads/.

Author: James Jones
Course: COMP3123 – Full Stack Development 1
