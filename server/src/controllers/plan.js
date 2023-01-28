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
      "El error controllers plan getUserByStripeCustomerId es:",
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
    const foundPlan = await userInfo.getPlan();
    console.log("FOUND PLAN", foundPlan);
    if (foundPlan === null) {
      console.log("FOUND PLAN NULL BODY", body);
      const newPlan = await Plan.create(body);
      console.log("NEW PLAN", newPlan);
      await userInfo.setPlan(newPlan);
    } else if (
      foundPlan.dataValues.endTime === body.endTime &&
      foundPlan.dataValues.name === body.name
    ) {
      console.log("do nothing");
      return;
    } else {
      console.log("BODY 2", body);
      const newPlan = await Plan.create(body);
      console.log("NEW PLAN 2", newPlan);
      await userInfo.setPlan(newPlan);
    }
  } catch (error) {
    console.log("El error controllers plan createNewPlan es:", error.message);
  }
};

const getPlanByUserId = async (userId) => {
  try {
    const userInfo = await User.findOne({
      where: { id: userId },
    });
    const foundPlan = await userInfo.getPlan();
    return foundPlan;
  } catch (error) {
    console.log("El error controllers plan getPlanByUserId es:", error.message);
  }
};
module.exports = {
  getUserByStripeCustomerId,
  createNewPlan,
  getPlanByUserId,
};
