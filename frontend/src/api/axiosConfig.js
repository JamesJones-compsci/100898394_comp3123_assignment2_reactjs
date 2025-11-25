import axios from "axios";

const API = axios.create({
  baseURL: "http://backend:5000/api", // For Docker!
});

/*
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update to Docker container later if needed
});
*/

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;