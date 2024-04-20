const express = require("express");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
require("colors");

const errorMiddleware = require("./middlewares/errors.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const todosRoutes = require("./routes/todo.route");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();

app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(authMiddleware.initializePassport());
app.use(authMiddleware.sessionPassport());
app.use(rateLimit({ windowMs: 10 * 60 * 1000, max: 100 }));
app.use(hpp());
app.use(express.static(path.join(__dirname, "..", "public")));
app.all("/api/v1/*", loggerMiddleware);

app.use("/api/v1", authRoutes);
app.use("/api/v1/todos", authMiddleware.isLoggedIn, todosRoutes);
app.use("/api/v1/users", authMiddleware.isLoggedIn, userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold
  );
});

process.on("unhandledRejection", (err, _promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
