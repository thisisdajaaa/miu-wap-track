const { STATUS_CODES } = require("../constants/statusCodes");
const ErrorResponse = require("../utils/errorResponse");

const errorMiddleware = (err, _req, res, _next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.name === "CastError") {
    message = `Resource not found`;
    error = new ErrorResponse(message, STATUS_CODES.NOT_FOUND);
  }

  const errorContainer = err.errors
    ? Object.values(err.errors).map((data) => data.message)
    : error.message;

  res.status(error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: error.statusCode,
    errors: [errorContainer] || "Server Error",
  });
};

module.exports = errorMiddleware;
