const axios = require("axios");
const { Country, Activity, Country_Activity } = require("../../db");

const repeatedEmail = async (countries, name) => {
  let ids = await Country.findAll({ where: { name: countries } }); //busca los paises
  ids = ids.map((id) => {
    return id.dataValues.cca3;
  });

  let existingActivity = await Country_Activity.findAll({
    where: { activityName: name, countryCca3: ids },
  });
  existingActivity = existingActivity.map((activity) => {
    return activity.dataValues.countryCca3;
  });
  const strIds = existingActivity.join(", ");
  return strIds;
};

const postUser = async (bodyInfo, countries) => {
  const { name } = bodyInfo;
  const countryInfo = await Country.findAll({
    where: { name: countries }, //busca todos los countries
  });
  const activityInfo = await Activity.findOne({
    where: { name: name }, //busca todos los countries
  });
  let activity = null;
  if (activityInfo) {
    activity = activityInfo;
  } else {
    activity = await Activity.create(bodyInfo);
  }

  await activity.addCountry(countryInfo);
  let results = await Country.findAll({
    where: { name: countries },
    include: {
      model: Activity,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  results = results.map((result) => {
    return result.dataValues;
  });
  return results;
};
module.exports = { repeatedEmail };
