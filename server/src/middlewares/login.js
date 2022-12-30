const { Router } = require("express");
const router = Router();
const { verifyGoogleToken } = require("../controllers/googleToken.js");
const { getUserByEmail } = require("../controllers/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;

      const existsInDB = DB.find((person) => person?.email === profile?.email);

      if (!existsInDB) {
        return res.status(400).json({
          message: "You are not registered. Please sign up",
        });
      }

      res.status(201).json({
        message: "Login was successful",
        user: {
          firstName: profile?.given_name,
          lastName: profile?.family_name,
          picture: profile?.picture,
          email: profile?.email,
          token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          }),
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
});
router.post("/manual", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user.userId === 0) {
      return res.status(204).send(user);
    } else {
      function copareHash(password, hashed) {
        return bcrypt.compareSync(password, hashed);
      }
      if (copareHash(password, user.hashedPassword)) {
        console.log("usuario correcto y contrasñea correcta");
        return res.status(200).send(user);
      } else {
        return res.status(204).send("contraseña o usuario incorrecto");
      }
    }
  } catch (error) {
    console.log("El error middleware login post /manual es:", error.message);
    res
      .status(401)
      .send("El error middleware login post /manual es");
  }
});
module.exports = router;
