const express = require("express");

const router = express.Router();

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

// GET all employees
// POST new employee
router.route("/")
  .get(getEmployees)
  .post(createEmployee);

// GET employee by ID
// PUT update employee
// DELETE employee
router.route("/:id")
  .get(getEmployeeById)
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;