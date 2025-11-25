import React from "react";
import API from "../api/axiosConfig";
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

function EmployeeList({ employees, onDelete }) {
  const handleDelete = async (id) => {
    await API.delete(`/employees/${id}`);
    onDelete();
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Position</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((emp) => (
          <TableRow key={emp._id}>
            <TableCell>{emp.name}</TableCell>
            <TableCell>{emp.email}</TableCell>
            <TableCell>{emp.position}</TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(emp._id)} color="error">Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default EmployeeList;
