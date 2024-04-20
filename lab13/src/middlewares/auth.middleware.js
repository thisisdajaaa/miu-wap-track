const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const userService = require("../services/user.service");
const ErrorResponse = require("../utils/errorResponse");
const { STATUS_CODES } = require("../constants/statusCodes");

passport.use(
  new LocalStrategy((username, password, done) => {
    try {
      const user = userService.getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = userService.getUserById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

const isLoggedIn = (req, _res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return next(
      new ErrorResponse(
        "Not authorized to access this API",
        STATUS_CODES.UNAUTHORIZED
      )
    );
  }
};

module.exports = {
  initializePassport: () => passport.initialize(),
  sessionPassport: () => passport.session(),
  isLoggedIn,
};
