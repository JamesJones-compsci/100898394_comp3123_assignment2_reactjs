import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// Middleware  
/*
app.use(cors());
*/

app.use(cors({
  origin: ["http://localhost:3000", "100898394-comp3123-assignment2-reactjs-e6vd-ag57cawpl.vercel.app"], // replace with your Vercel URL
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("Backend server is running successfully...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
