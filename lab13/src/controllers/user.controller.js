const { STATUS_CODES } = require("../constants/statusCodes");
const userService = require("../services/user.service");
const ErrorResponse = require("../utils/errorResponse");
const { getPaginationData, paginate } = require("../utils/paginationHelper");

const getUsers = (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const totalCount = userService.getTotalCount();
  const users = userService.getAllUsers();

  const paginatedUsers = paginate(users, page, limit);
  const paginationData = getPaginationData(page, limit, totalCount);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: paginatedUsers,
    pagination: paginationData,
    message: "Successfully retrieved the list of users.",
  });
};

const getUserById = (req, res, next) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user)
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: user,
    status: STATUS_CODES.OK,
    message: "Successfully retrieved the user.",
  });
};

const createUser = (req, res, next) => {
  const payload = {
    ...req.body,
    password: process.env.DEFAULT_PASSWORD,
  };

  const isUserExisting = !!userService.getUserByUsername(payload.username);

  if (isUserExisting)
    return next(
      new ErrorResponse("User already exists.", STATUS_CODES.BAD_REQUEST)
    );

  const newUser = userService.createUser(payload);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: newUser,
    status: STATUS_CODES.CREATED,
    message: "Successfully added the user.",
  });
};

const deleteUser = (req, res, next) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (req.user.id === user.id)
    return next(
      new ErrorResponse(
        "You are not allowed to delete your credentials while being logged in.",
        STATUS_CODES.BAD_REQUEST
      )
    );

  if (!user)
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );

  userService.deleteUser(id);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    status: STATUS_CODES.OK,
    message: "Successfully deleted the user.",
  });
};

const updateUser = (req, res, next) => {
  const { id } = req.params;

  const user = userService.getUserById(id);

  if (!user)
    return next(
      new ErrorResponse(
        `Resource not found with id of ${id}`,
        STATUS_CODES.NOT_FOUND
      )
    );

  if (req.user.id === user.id)
    return next(
      new ErrorResponse(
        "You are not allowed to update your credentials while being logged in.",
        STATUS_CODES.BAD_REQUEST
      )
    );

  const updatedUser = userService.updateUser(id, req.body);

  return res.status(STATUS_CODES.OK).json({
    success: true,
    data: updatedUser,
    status: STATUS_CODES.OK,
    message: "Successfully updated the user.",
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
