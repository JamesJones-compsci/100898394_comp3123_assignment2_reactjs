// frontend/src/pages/Dashboard.js

import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import { TextField, Container, Typography, Button } from "@mui/material";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState(""); // For search input
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // Fetch all employees from backend
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees");
      setEmployees(res.data);
      setFilteredEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Delete employee and refresh list
  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Search employees by name, email, or position
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.position.toLowerCase().includes(query)
    );
    setFilteredEmployees(filtered);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        Employee Dashboard
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Search by name, email, or position"
        margin="normal"
        value={search}
        onChange={handleSearch}
      />

      {/* Employee Form for Add / Update */}
      <EmployeeForm onAdded={fetchEmployees} />

      {/* Employee List Table */}
      <EmployeeList
        employees={filteredEmployees}
        onDelete={handleDelete}
        onRefresh={fetchEmployees}
      />
    </Container>
  );
}

export default Dashboard;
