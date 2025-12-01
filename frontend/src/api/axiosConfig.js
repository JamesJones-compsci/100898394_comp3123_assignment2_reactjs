import axios from "axios";
// import { getToken } from "../context/AuthContext"; // Import the helper

/*
const API = axios.create({
  baseURL: "http://backend:5000/api", // For Docker!
});
*/

/*
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update to Docker container later if needed
});
*/

/*
// Use Docker service name in Docker, fallback to localhost for local dev
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://backend:5000/api",
});
*/

/*
// Dynamically choose baseURL based on environment
const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api" // browser dev
      : "http://backend:5000/api",  // Docker container
});
*/

/*
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://backend:5000/api",
});
*/

/*
const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"             // Local backend
      : "https://comp3123-backend5.onrender.com", // Deployed backend
});
*/

const API = axios.create({
  baseURL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://comp3123-backend5.onrender.com/api", // Add `/api` here
});

// Attach JWT automatically with safety
API.interceptors.request.use(
  (req) => {
    try {
      const token = localStorage.getItem("token"); // safe direct access
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.warn("Failed to attach token:", err);
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;