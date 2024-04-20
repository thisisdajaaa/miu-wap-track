const todoService = require("../services/todo.service");

const todoMiddleware = (req, _res, next) => {
  const todo = todoService.getTodoById(req.params.id);

  if (todo && todo.isPrivate) {
    next("route");
  } else {
    req.todo = todo;
    next();
  }
};

module.exports = todoMiddleware;
