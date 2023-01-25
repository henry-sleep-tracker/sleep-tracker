require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./index.js");
const session = require("express-session"); //esto permite crear sesiones con un tiempo de
require("./db.js");
const { PORT } = process.env;
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const server = express();

const serverApp = http.createServer(server);
const io = new Server(serverApp, {
  cors: {
    origin: "*",
  },
});
server.use(cors());

server.name = "API";

server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    express.json({ limit: "50mb" })(req, res, next);
  }
});
server.use(express.text());
server.use(cookieParser());

server.use(morgan("dev"));
server.use((req, res, next) => {
  //Choose the line below to test with local server
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //Choose the line below to use with gitHub
  //  res.header("Access-Control-Allow-Origin", "https://sleep-tracker-two.vercel.app"); https://sleep-tracker-two.vercel.app
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, ContentType, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

io.on("connection", (socket) => {
  socket.on("message", (message, currentUser) => {
    socket.broadcast.emit("message", {
      body: message,
      from: currentUser,
    });
  });
});

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
