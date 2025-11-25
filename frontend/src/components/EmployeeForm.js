// frontend/src/components/EmployeeForm.js
import React, { useState, useEffect } from "react";
import API from "../api/axiosConfig";
import { TextField, Button, Box, Typography } from "@mui/material";

function EmployeeForm({ onAdded, editEmployee, onUpdateFinished }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  // If editing, populate form with existing data
  useEffect(() => {
    if (editEmployee) {
      setForm({
        name: editEmployee.name,
        email: editEmployee.email,
        position: editEmployee.position,
      });
      setProfileImage(null); // Optional: leave existing image as is
    }
  }, [editEmployee]);

  // Handle input change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Handle file change
  const handleFileChange = (e) => setProfileImage(e.target.files[0]);

  // Validate form
  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (!form.position) errs.position = "Position is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("position", form.position);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      if (editEmployee) {
        await API.put(`/employees/${editEmployee._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onUpdateFinished();
      } else {
        await API.post("/employees", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        onAdded();
      }
      setForm({ name: "", email: "", position: "" });
      setProfileImage(null);
      setErrors({});
    } catch (error) {
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {editEmployee ? "Update Employee" : "Add New Employee"}
      </Typography>
      <TextField
        fullWidth
        name="name"
        label="Name"
        value={form.name}
        onChange={handleChange}
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        fullWidth
        name="email"
        label="Email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        name="position"
        label="Position"
        value={form.position}
        onChange={handleChange}
        margin="normal"
        error={!!errors.position}
        helperText={errors.position}
      />
      <Button variant="contained" component="label" sx={{ mt: 1, mb: 1 }}>
        Upload Profile Image
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {profileImage && <Typography>{profileImage.name}</Typography>}
      <Button type="submit" variant="contained">
        {editEmployee ? "Update Employee" : "Add Employee"}
      </Button>
    </Box>
  );
}

export default EmployeeForm;
