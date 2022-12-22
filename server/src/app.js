const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./index.js");
const session = require("express-session"); //esto permite crear sesiones con un tiempo de expiracion y demas
const { SECRET } = process.env;

require("./db.js");

const server = express();

server.name = "API";

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.text());
server.use(cookieParser());
server.use(
  session({
    name: "sid",
    secret: SECRET, //aca trae el secreto del archivo .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 horas en milisegundos
    },
  })
);
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

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
