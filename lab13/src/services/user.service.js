const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/user.repository");

const getAllUsers = () => userRepository.findAll();

const getUserById = (id) => userRepository.findById(id);

const getUserByUsername = (username) => userRepository.findByUsername(username);

const createUser = (user) => {
  const newUser = {
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  };

  return userRepository.save(newUser);
};

const deleteUser = (id) => userRepository.remove(id);

const updateUser = (id, updatedUser) => {
  const newUser = {
    ...updatedUser,
    password: bcrypt.hashSync(updatedUser.password, 10),
  };

  userRepository.update(id, newUser);
};

const getTotalCount = () => getAllUsers().length;

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  deleteUser,
  updateUser,
  getTotalCount,
};
