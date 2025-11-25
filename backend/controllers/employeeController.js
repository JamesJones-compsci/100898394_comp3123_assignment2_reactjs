import Employee from "../models/Employee.js";

// CREATE
export const createEmployee = async (req, res) => {
  try {
    const { name, position, department, salary } = req.body;
    const profileImage = req.file ? req.file.filename : null;
    const employee = await Employee.create({
      name, position, department, salary, profileImage, createdBy: req.user.id,
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ
export const getEmployees = async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user.id });
  res.json(employees);
};

// UPDATE
export const updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
};

// DELETE
export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted successfully" });
};
