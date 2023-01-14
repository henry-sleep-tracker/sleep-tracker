const {
  findUserByEmail,
  findUserById,
  updatePassword,
} = require("../functions/user");
const bcrypt = require("bcrypt");
const { STRIPE_SECRET_KEY } = process.env;
const Stripe = require("stripe");
const JWT_SECRET = "CVDF61651BV231TR894VBCX51LIK5LÑK84";
// const basicURL = "http://localhost:3000";
const jwt = require("jsonwebtoken");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const { User } = require("../db.js");
const nullUser = {
  dataValues: "",
};

const postUser = async (req, res) => {
  try {
    const { email, password, names, lastNames, nationality, birthday } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10); //la segunda variable es el numero de rondas que se encriptara
    const customer = await stripe.customers.create(
      {
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
    const bodyInfo = {
      email,
      hashedPassword,
      names,
      lastNames,
      nationality,
      birthday,
      stripeCustomerId: customer.id,
    };
    if (!email || !names || !lastNames) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const oldUser = await findUserByEmail(email);
    if (oldUser.id !== 0) {
      return res.status(406).send(`El email ya esta registrado en la BD`);
    }
    let createdUser = await User.create(bodyInfo);
    res.status(201).json(createdUser); //201 es que fue creado
  } catch (error) {
    console.log("El error controllers user postUser es:", error.message);
    res
      .status(401)
      .send("El error controllers user postUser es:", error.message);
  }
};

const postGoogleUser = async (req, res) => {
  try {
    const { email, names, lastNames } = req.body;
    const customer = await stripe.customers.create(
      {
        email,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );
    if (!email || !names || !lastNames) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const bodyInfo = { email, names, lastNames, stripeCustomerId: customer.id };
    const oldUser = await findUserByEmail(email);
    if (oldUser.id !== 0) {
      return res.status(202).send(oldUser);
    } else {
      let createdUser = await User.create(bodyInfo);
      res.status(201).json(createdUser.dataValues); //201 es que fue creado
    }
  } catch (error) {
    console.log("El error controllers user postGoogleUser es:", error.message);
    res.status(401).send("El error controllers user postGoogleUser es");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const oldUser = await findUserByEmail(email);
    if (oldUser.id === 0) {
      return res.status(202).send({ status: "el usuario no existe" });
    }
    const secret = JWT_SECRET + oldUser.hashedPassword;
    const token = jwt.sign({ email: oldUser.email, id: oldUser.id }, secret, {
      expiresIn: "50m",
    });
    const link = `${process.env.BASE_FRONT_URL}/reiniciar_contrasena/${oldUser.id}/${token}`;
    console.log("el link es:", link);
    res.status(200).json(link); //201 es que fue creado
  } catch (error) {
    console.log("El error controllers user forgotPassword es:", error.message);
    res.status(401).send("El error controllers user forgotPassword es");
  }
};

const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;
    if (!id || !token || !password) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const oldUser = await User.findOne({ where: { id: id } });
    if (!oldUser) {
      return res.status(202).send("el usuario no existe");
    }
    const secret = JWT_SECRET + oldUser.hashedPassword;
    const verify = jwt.verify(token, secret);
    const hashedPassword = await bcrypt.hash(password, 10);
    updatePassword(id, hashedPassword);
    res.status(200).send("Verificado");
  } catch (error) {
    console.log("El error controllers resetPassword es:", error.message);
    res.status(400).send("Sin verificar");
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const user = await findUserByEmail(email);
    if (user.id === 0) {
      return res.status(204).send(nullUser);
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.log("El error controllers user getUserByEmail es:", error.message);
    res
      .status(401)
      .send("El error controllers user getUserByEmail es:", error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id, password } = req.params;
    function copareHash(password, hashed) {
      return bcrypt.compareSync(password, hashed);
    }

    if (!id || !password) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }

    const user = await findUserById(id);
    if (!user) {
      return res.status(202).send("el usuario no existe");
    }

    if (copareHash(password, user.hashedPassword)) {
      const result = await User.destroy({
        where: {
          id: id,
        },
      });
      console.log("RESULT DELETE", result); // 0 es que no borro y 1 es que si borro
      return res.status(200).send("Usuario eliminado");
    }
  } catch (error) {
    return res.status(400).send("No se pudo eliminar el usuario");
  }
};

const updateProfile = async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  console.log("ID RUTA", id);
  console.log("INFO PROFILE", info);
  try {
    const update = await User.update(info, {
      where: {
        id: id,
      },
    });
    console.log("ROUTE UPDATE", update);
    if (update) {
      const user = await User.findOne({ where: { id: id } });
      console.log("ROUTE UPDATE USER", user);
      return res.status(200).jsonp(user);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};
const changeUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    console.log("CHANGE PASSWORD ID", id);
    console.log("NEW PASSWORD", newPassword);
    if (!id || !newPassword) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const oldUser = await findUserById(id);
    if (!oldUser) {
      return res.status(202).send("el usuario no existe");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updatePassword(id, hashedPassword);
    return res.status(200).send("Verificado");
  } catch (error) {
    res.status(400).send("Sin verificar");
  }
};

module.exports = {
  postUser,
  postGoogleUser,
  forgotPassword,
  resetPassword,
  getUserByEmail,
  deleteUser,
  updateProfile,
  changeUserPassword,
};
