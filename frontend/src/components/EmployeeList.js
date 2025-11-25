// frontend/src/components/EmployeeList.js
import React, { useState } from "react";
import API from "../api/axiosConfig";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Avatar,
  Box,
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";

function EmployeeList({ employees, onDelete, onRefresh }) {
  const [editingEmployee, setEditingEmployee] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await API.delete(`/employees/${id}`);
      onDelete();
    }
  };

  const handleEditFinish = () => {
    setEditingEmployee(null);
    onRefresh();
  };

  return (
    <Box>
      {/* Inline form for editing */}
      {editingEmployee && (
        <EmployeeForm
          editEmployee={editingEmployee}
          onUpdateFinished={handleEditFinish}
        />
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp._id}>
              <TableCell>
                <Avatar src={emp.profileImage || ""} alt={emp.name} />
              </TableCell>
              <TableCell>{emp.name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  sx={{ mr: 1 }}
                  onClick={() => setEditingEmployee(emp)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(emp._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default EmployeeList;
