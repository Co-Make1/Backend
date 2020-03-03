const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
// const commentsRouter = require("../comments/comments-router");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
// server.use("/api/comments", commentsRouter);

server.get("/", (req, res) => {
  res.send("<h3>Co-make API is live!</h3>");
});

server.use((err, req, res, next) => {
  console.log(`err.message: `, err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

module.exports = server;
