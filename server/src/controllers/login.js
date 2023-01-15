const { verifyGoogleToken } = require("../controllers/googleToken.js");
const { findUserByEmail } = require("../functions/user");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
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
};

const manualLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(428).send("falta email o contraseña");
  }
  try {
    const user = await findUserByEmail(email);
    if (user.id === 0) {
      return res.status(204).send("contraseña o usuario incorrecto");
    } else if (user.deletedAt !== null) {
      //si el usuario fue borrado
      function copareHash(password, hashed) {
        return bcrypt.compareSync(password, hashed);
      }
      if (copareHash(password, user.hashedPassword)) {
        console.log("usuario correcto y contraseña correcta");
        return res.status(202).send(user);
      } else {
        return res.status(204).send("contraseña o usuario incorrecto");
      }
    } else {
      //si todo esta bien con el usuario
      function copareHash(password, hashed) {
        return bcrypt.compareSync(password, hashed);
      }
      if (copareHash(password, user.hashedPassword)) {
        console.log("usuario correcto y contraseña correcta");
        return res.status(200).send(user);
      } else {
        return res.status(204).send("contraseña o usuario incorrecto");
      }
    }
  } catch (error) {
    console.log("El error middleware login post /manual es:", error.message);
    res.status(401).send("El error middleware login post /manual es");
  }
};

module.exports = {
  login,
  manualLogin,
};
