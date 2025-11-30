import React, { useState } from "react";
import API from "../api/axiosConfig";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic frontend validation
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      // Call backend signup API
      await API.post("/auth/register", form);
      // On success, redirect to login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Show backend error message if available
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: 2 }}>Signup</Typography>

      {/* Display error message */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Signup
        </Button>
      </form>
    </Container>
  );
}

export default Signup;
