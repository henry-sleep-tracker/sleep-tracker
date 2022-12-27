const { Router } = require("express");
const { Activity } = require("../db");
const router = Router();
const { postUser, repeatedEmail } = require("../controllers/user");

router.post("/", async (req, res) => {
  try {
    const {
      googleId,
      email,
      password,
      names,
      lastNames,
      nationality,
      birthday,
    } = req.body;
    const hashedPassword = password;
    const bodyInfo = {
      googleId,
      email,
      hashedPassword,
      names,
      lastNames,
      nationality,
      birthday,
    };
    if (
      !email ||
      !password ||
      !names ||
      !lastNames ||
      !nationality ||
      !birthday
    ) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }
    console.log("1");
    const isRepeated = await repeatedEmail(email);
    console.log("2");
    if (isRepeated.length > 0) {
      return res.status(406).send(`El email ya esta registrado en la BD`);
    }
    console.log("3");
    let createdUser = await postUser(bodyInfo);
    console.log("4");
    res.status(201).json(createdUser); //201 es que fue creado
  } catch (error) {
    console.log("El error middleware user post / es:", error.message);
    res.status(401).send("El error middleware user post / es:", error.message);
  }
});
module.exports = router;
