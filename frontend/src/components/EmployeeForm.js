import React, { useState } from "react";
import API from "../api/axiosConfig";
import { TextField, Button } from "@mui/material";

function EmployeeForm({ onAdded }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/employees", form); // Add profileImage field if needed
    onAdded();
    setForm({ name: "", email: "", position: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" value={form.name} onChange={handleChange}/>
      <TextField name="email" label="Email" value={form.email} onChange={handleChange}/>
      <TextField name="position" label="Position" value={form.position} onChange={handleChange}/>
      <Button type="submit" variant="contained">Add Employee</Button>
    </form>
  );
}

export default EmployeeForm;
