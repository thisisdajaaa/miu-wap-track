const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
require("colors");

const userService = require("./services/user.service");
const todoService = require("./services/todo.service");

// Load env vars
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Read JSON files
const todos = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "..", "public", "fixtures", "todos.json"),
    "utf-8"
  )
);

const users = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "..", "public", "fixtures", "users.json"),
    "utf-8"
  )
);

// Import into DB
const importData = async () => {
  try {
    importUsers();
    importTodos();
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    deleteUsers();
    deleteTodos();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const importUsers = () => {
  users.forEach((user) => {
    userService.createUser(user);
  });
};

const importTodos = () => {
  todos.forEach((todo) => {
    todoService.createTodo(todo);
  });
};

const deleteUsers = () => {
  userService.getAllUsers().forEach((user) => {
    userService.deleteUser(user.id);
  });
};

const deleteTodos = () => {
  todoService.getAllTodos().forEach((todo) => {
    todoService.deleteTodo(todo.id);
  });
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
