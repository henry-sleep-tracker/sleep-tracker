const { Router } = require("express");
const router = Router();
const {
  postUser,
  repeatedEmail,
  getUserByEmail,
} = require("../controllers/user");
const bcrypt = require("bcrypt");

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
    } = req.body.user;
    const hashedPassword = await bcrypt.hash(password, 10); //la segunda variable es el numero de rondas que se encriptara
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
    const isRepeated = await repeatedEmail(email);
    if (isRepeated.length > 0) {
      return res.status(406).send(`El email ya esta registrado en la BD`);
    }
    let createdUser = await postUser(bodyInfo);
    res.status(201).json(createdUser); //201 es que fue creado
  } catch (error) {
    console.log("El error middleware user post / es:", error.message);
    res.status(401).send("El error middleware user post / es:", error.message);
  }
});

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!email) {
      return res.status(204).send("that id does not exist in the database");
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log("El error middleware user get /:email es:", error.message);
    res
      .status(401)
      .send("El error middleware user get /:email es:", error.message);
  }
});
module.exports = router;
