const passport = require("passport");

const ErrorResponse = require("../utils/errorResponse");
const { STATUS_CODES } = require("../constants/statusCodes");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user)
      return next(
        new ErrorResponse(
          info.message || "Not authorized to access this API",
          STATUS_CODES.UNAUTHORIZED
        )
      );

    req.logIn(user, (err) => {
      if (err) return next(err);

      const { id, username } = user;

      return res.json({
        success: true,
        message: "Login successful",
        data: { id, username },
        status: STATUS_CODES.OK,
      });
    });
  })(req, res, next);
};

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    res.status(STATUS_CODES.OK).send("Logout successful.");
  });
};

module.exports = {
  login,
  logout,
};
