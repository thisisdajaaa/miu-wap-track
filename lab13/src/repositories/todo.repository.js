const todos = new Map();

let autoIncrementID = 0;

const save = (todo) => {
  todos.set(++autoIncrementID, { id: +autoIncrementID, ...todo });
  return todos.get(+autoIncrementID);
};

const findById = (id) => todos.get(+id);

const findAll = () => Array.from(todos.values());

const remove = (id) => todos.delete(+id);

const update = (id, newTodo) => {
  const currentTodo = todos.get(+id);
  const updatedTodo = { ...currentTodo, ...newTodo };
  todos.set(+id, updatedTodo);
  return updatedTodo;
};

module.exports = {
  save,
  findAll,
  findById,
  remove,
  update,
};
