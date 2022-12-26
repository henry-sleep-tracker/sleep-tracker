const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./index.js");
const session = require("express-session"); //esto permite crear sesiones con un tiempo de expiracion y demas. guarda el usuario a travez de varias paginas
const initializePassport = require("./passport-config");
const passport = require("/passport"); // permite usar muchas formas de loguearse
const flash = require("/express-flash"); // muestra mensges en caso de que hayamos escrito algo mal al iniciar sesion
const { SECRET } = process.env;
initializePassport(passport, (email) =>
  users.find((user) => user.email === email)
);
require("./db.js");
const server = express();
server.name = "API";

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(express.text());
server.use(cookieParser());

app.use(flash());
server.use(
  session({
    name: "sid",
    secret: SECRET || "contraseña", //aca trae el secreto del archivo .env
    resave: false, //guarda nuestras variables de entorno si nada se cambia. decimos no
    saveUninitialized: false, //queremos guardar un valor vacio en la sesion si no hay valor. decimos no
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 2, // 2 horas en milisegundos
    // },
  })
);
app.use(passport.initialize()); //una funcion basica de inicializacion
app.use(passport.session()); //vamos a guardar nuestras variables a travez de toda la sesion del usuario, que va  funcionar con la configuracionde session de arriba
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
