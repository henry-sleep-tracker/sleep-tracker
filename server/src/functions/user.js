const { User, Plan } = require("../db");
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

const findUserByEmail = async (email) => {
  try {
    const userFound = await User.findOne({
      where: { email: email },
      include : {model:Plan,attributes:['id','name','price','endTime']},
    });
    if (userFound !== null) {
      return userFound.dataValues;
    } else {
      return nullUser;
    }
  } catch (error) {
    console.log("El error function user findUserByEmail es:", error.message);
    res
      .status(401)
      .send("El error function user findUserByEmail es:", error.message);
  }
};

const findUserById = async (id) => {
  try {
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

const updateFreePlanUsage = async (id) => {
  try {
    const userFound = await User.findOne({ where: { id: id } });
    const userUpdated = await userFound.update({
      hasUsedFreePlan: true,
    });
    userUpdated.save();
  } catch (error) {
    console.log(
      "El error controllers user updateFreePlanUsage es:",
      error.message
    );
    res
      .status(401)
      .send("El error controllers user updateFreePlanUsage es:", error.message);
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  updatePassword,
  updateFreePlanUsage,
};
