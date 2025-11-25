import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { body } from "express-validator";

const router = express.Router();

// Validation rules
const validateRegistration = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("password").isLength({ min: 6 }).withMessage("Password ≥ 6 chars"),
];

// Routes
router.post("/register", validateRegistration, registerUser);
router.post("/login", loginUser);

export default router;
