const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router
  .route("/:id")
  .get(studentController.getStudentByID)
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudentById);

module.exports = router;
