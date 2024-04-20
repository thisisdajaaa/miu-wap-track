const todoRepository = require("../repositories/todo.repository");

const getAllTodos = () => todoRepository.findAll();

const getTodoById = (id) => todoRepository.findById(id);

const createTodo = (todo) => todoRepository.save(todo);

const deleteTodo = (id) => todoRepository.remove(id);

const updateTodo = (id, updatedTodo) => todoRepository.update(id, updatedTodo);

const getTotalCount = () => getAllTodos().length;

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  getTotalCount,
};
