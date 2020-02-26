const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const server = express.Router();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());

server.get("/", (req, res) => {
  res.send("<h3>Co-make api is live!</h3>");
});

server.use((err, req, res, next) => {
  console.log(`err.message: `, err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message
  });
});

module.exports = server;
