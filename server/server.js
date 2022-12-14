const express = require("express");
const app = express();
require("dotenv/config");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());

let DB = [];

app.listen("3000", () => console.log("Server running on port 3000"));
