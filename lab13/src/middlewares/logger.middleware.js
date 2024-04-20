const loggerMiddleware = (req, _res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );

  next();
};

module.exports = loggerMiddleware;
