const { Router } = require("express");
const { Activity } = require("../../db");
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
    const bodyInfo = {
      googleId,
      email,
      password,
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
    const isRepeated = await repeatedEmail(email);
    if (strIds) {
      return res.status(406).send(`El email ya esta registrado en la BD`);
    }
    let createdUser = await postUser(bodyInfo);

    res.status(201).json(createdUser); //201 es que fue creado
  } catch (error) {
    console.log("El error middleware activity post / es:", error.message);
    res
      .status(401)
      .send("El error middleware activity post / es:", error.message);
  }
});
module.exports = router;
