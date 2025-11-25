import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import EmployeeList from "../components/EmployeeList";
import EmployeeForm from "../components/EmployeeForm";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <>
      <EmployeeForm onAdded={fetchEmployees}/>
      <EmployeeList employees={employees} onDelete={fetchEmployees}/>
    </>
  );
}

export default Dashboard;
