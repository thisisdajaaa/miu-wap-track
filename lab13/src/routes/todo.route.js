const express = require("express");

const {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  unauthorizedTodo,
  getTodoText,
} = require("../controllers/todo.controller");
const todoMiddleware = require("../middlewares/todo.middleware");

const router = express.Router();

router.route("/").get(getTodos).post(createTodo);

router.get("/todos-text", getTodoText);

router
  .route("/:id")
  .get(todoMiddleware, getTodoById)
  .delete(deleteTodo)
  .put(updateTodo);

router.route("/:id").get(unauthorizedTodo);

module.exports = router;
