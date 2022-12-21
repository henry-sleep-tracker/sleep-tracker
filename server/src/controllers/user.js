const axios = require("axios");
const { User } = require("../db");

const repeatedEmail = async (email) => {
  try {
    let foundEmail = await User.findAll({ where: { email: email } }); //busca los paises
    console.log("foundEmail:", foundEmail);
    return foundEmail;
  } catch (error) {
    console.log("El error controllers user repeatedEmail es:", error.message);
    res
      .status(401)
      .send("El error controllers user repeatedEmail es:", error.message);
  }
};

const postUser = async (bodyInfo) => {
  console.log("bodyInfo:", bodyInfo);
  const createdUser = await User.create(bodyInfo);
  console.log("activity:", createdUser);
  return activity.dataValues;
};
module.exports = { postUser, repeatedEmail };
