import axios from "axios";
// import { getToken } from "../context/AuthContext"; // Import the helper


/*
const API = axios.create({
  baseURL: "http://backend:5000/api", // For Docker!
});
*/

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update to Docker container later if needed
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