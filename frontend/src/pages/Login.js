import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axiosConfig";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // Handle backend flags first
      if (res.data.mustChangePassword) {
        alert("You must change your password.");
        navigate("/change-password");
        return;
      }

      // Normal login flow
      login(res.data.token); // <-- FIXED (removed res.data.user)
      navigate("/dashboard"); // this will work now

    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
