const { NewRecord } = require("../db.js");

const new_record_validator = async (req, res, next) => {
  let { dateMeal, timeMeal, sleepTime, coffee, drink, activity } = req.body;

  if (sleepTime) {
    parseInt(sleepTime);
  }

  if (!coffee) {
    coffee = [];
  }
  if (!drink) {
    drink = [];
  }
  if (!activity) {
    activity = [];
  }

  return next();
};

module.exports = { new_record_validator };
