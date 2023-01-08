const { User, Plans } = require("../db");
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

const getUserByStripeCustomerId = async (stripeCustomerId) => {
  try {
    const userFound = await User.findOne({
      where: { stripeCustomerId: stripeCustomerId },
    });
    if (userFound !== null) {
      return userFound.dataValues;
    } else {
      return nullUser;
    }
  } catch (error) {
    console.log(
      "El error controllers plans getUserByStripeCustomerId es:",
      error.message
    );
    res
      .status(401)
      .send(
        "El error controllers plans getUserByStripeCustomerId es:",
        error.message
      );
  }
};
const createNewPlan = async (planPrice, userId) => {
  let yourDate = new Date();
  let name, price, endTime;
  function sumDate(numDays) {
    yourDate = yourDate.setDate(yourDate.getDate() + numDays);
    var date = new Date(yourDate);
    return (endTime = date.toISOString().split("T")[0]);
  }
  switch (planPrice) {
    case 0:
      name = "Basico";
      price = 0;
      endTime = sumDate(30);
      break;
    case 100:
      name = "Estandar";
      price = 1;
      endTime = sumDate(30);
      break;

    default:
      name = "Premium";
      price = 10;
      endTime = sumDate(365);
      break;
  }
  const body = { name, price, endTime };
  try {
    const userInfo = await User.findOne({
      where: { id: userId },
    });
    if (userInfo.planId === null) {
      const newPlan = await Plans.create(body);
      //   console.log("1newPlan:", newPlan);
      newPlan.createUser(userInfo);
      //   console.log("2newPlan:", newPlan);
      //   console.log("usuario asociado:", userInfo);
    } else {
      //   const originalPlan = await Plans.findOne({
      //     where: { id: userInfo.planId }, //busca todas las dietas donde el nombre coincida con lo traido por el body
      //   });
      //   if (originalPlan.endTime !== body.endTime) {
      //   }
    }

    const result = await User.findAll();
    //   console.log("result:", result);
  } catch (error) {
    console.log("El error controllers plans createNewPlan es:", error.message);
  }
};
module.exports = {
  getUserByStripeCustomerId,
  createNewPlan,
};
