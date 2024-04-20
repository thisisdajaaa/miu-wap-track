const bcrypt = require("bcryptjs");

const users = new Map();

// Seed initial admin data
users.set(1, {
  id: 1,
  username: "admin",
  password: bcrypt.hashSync("pass123", 10),
});

let autoIncrementID = 1;

const omitPassword = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const findById = (id) => {
  const user = users.get(+id);
  return user ? omitPassword(user) : undefined;
};

const findByUsername = (username) => {
  const user = Array.from(users.values()).find(
    (item) => item.username === username
  );

  return user;
};

const findAll = () => Array.from(users.values()).map(omitPassword);

const remove = (id) => users.delete(+id);

const save = (user) => {
  autoIncrementID++;
  const newUser = { id: autoIncrementID, ...user };
  users.set(autoIncrementID, newUser);
  return omitPassword(newUser);
};

const update = (id, newValues) => {
  const currentUser = users.get(+id);
  if (!currentUser) {
    return undefined;
  }
  const updatedUser = { ...currentUser, ...newValues };
  users.set(+id, updatedUser);
  return omitPassword(updatedUser);
};

module.exports = { save, findByUsername, findById, findAll, remove, update };
