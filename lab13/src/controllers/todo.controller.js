const path = require("path");

const { STATUS_CODES } = require("../constants/statusCodes");
const todoService = require("../services/todo.service");
const ErrorResponse = require("../utils/errorResponse");
const { getPaginationData, paginate } = require("../utils/paginationHelper");

const getTodos = (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const totalCount = todoService.getTotalCount();
  const todos = todoService.getAllTodos();

  const paginatedTodos = paginate(todos, page, limit);
  const paginationData = getPaginationData(page, limit, totalCount);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: paginatedTodos,
    pagination: paginationData,
    message: "Successfully retrieved the list of todos.",
  });
};

const getTodoById = (req, res, next) => {
  const { id } = req.params;
  const todo = req.todo;

  if (!todo) {
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );
  }

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: todo,
    status: STATUS_CODES.OK,
    message: "Successfully retrieved the todo.",
  });
};

const createTodo = (req, res, _next) => {
  const newTodo = todoService.createTodo(req.body);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: newTodo,
    status: STATUS_CODES.CREATED,
    message: "Successfully added the todo.",
  });
};

const deleteTodo = (req, res, next) => {
  const { id } = req.params;

  const todo = todoService.getTodoById(id);

  if (!todo)
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );

  todoService.deleteTodo(id);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    status: STATUS_CODES.OK,
    message: "Successfully deleted the todo.",
  });
};

const updateTodo = (req, res, next) => {
  const { id } = req.params;

  const todo = todoService.getTodoById(id);

  if (!todo)
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );

  const updatedTodo = todoService.updateTodo(id, req.body);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: updatedTodo,
    status: STATUS_CODES.OK,
    message: "Successfully updated the todo.",
  });
};

const unauthorizedTodo = (_req, res) => {
  return res.status(STATUS_CODES.UNAUTHORIZED).send({
    success: false,
    message: "Access to this todo is restricted.",
  });
};

const getTodoText = (_req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "files",
    "todo.txt"
  );

  res.sendFile(filePath);
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
  unauthorizedTodo,
  getTodoText,
};
