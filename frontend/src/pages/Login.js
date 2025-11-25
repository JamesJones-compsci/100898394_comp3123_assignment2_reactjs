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
    const res = await API.post("/auth/login", form);
    login(res.data.token, res.data.user);
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Container>
  );
}

export default Login;
