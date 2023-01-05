const axios = require("axios");
const { User } = require("../db");
const nullUser = {
  id: 0,
  isAdmin: false,
  isActive: false,
  email: "",
  hashedPassword: "",
  names: "",
  lastNames: "",
  nationality: "",
  birthday: "",
  lastConnection: "",
};
const repeatedEmail = async (email) => {
  try {
    if (!email) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    let foundEmail = await User.findAll({ where: { email: email } }); //busca los paises
    return foundEmail;
  } catch (error) {
    console.log("El error controllers user repeatedEmail es:", error.message);
    res
      .status(401)
      .send("El error controllers user repeatedEmail es:", error.message);
  }
};

const postUser = async (bodyInfo) => {
  try {
    if (!bodyInfo) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const createdUser = await User.create(bodyInfo);
    return createdUser.dataValues;
  } catch (error) {
    console.log("El error controllers user postUser es:", error.message);
    res
      .status(401)
      .send("El error controllers user postUser es:", error.message);
  }
};
const getUserByEmail = async (email) => {
  try {
    if (!email) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const userFound = await User.findOne({
      where: { email: email },
    });
    if (userFound !== null) {
      return userFound.dataValues;
    } else {
      return nullUser;
    }
  } catch (error) {
    console.log("El error controllers user getUserByEmail es:", error.message);
    res
      .status(401)
      .send("El error controllers user getUserByEmail es:", error.message);
  }
};

const getUserById = async (id) => {
  try {
    if (!id) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const userFound = await User.findOne({ where: { id: id } });
    if (userFound !== null) {
      return userFound.dataValues;
    } else {
      return nullUser;
    }
  } catch (error) {
    console.log("El error controllers user getUserById es:", error.message);
    res
      .status(401)
      .send("El error controllers user getUserById es:", error.message);
  }
};
const updatePassword = async (id, hashedPassword) => {
  try {
    if (!id || !hashedPassword) {
      return res.status(428).send("Falta enviar datos obligatorios");
    }
    const userFound = await User.findOne({ where: { id: id } });
    const userUpdated = await userFound.update({
      hashedPassword: hashedPassword,
    });
    userUpdated.save();
  } catch (error) {
    console.log("El error controllers user updatePassword es:", error.message);
    res
      .status(401)
      .send("El error controllers user updatePassword es:", error.message);
  }
};

module.exports = {
  postUser,
  repeatedEmail,
  getUserByEmail,
  getUserById,
  updatePassword,
};
