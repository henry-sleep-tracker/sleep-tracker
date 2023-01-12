const { User, Plan } = require("../../db.js");

const numberUsersPerPlan = async (req, res) => {

  try {
    const users = await User.count();
    // const basico = await Plan.count({ where: {name: 'Basico' }});
    const estandar = await Plan.count({ where: {name: 'Estandar' }});
    const premium = await Plan.count({ where: {name: 'Premium' }});
    
    let numberUsersPerPlan = [
      { name: 'Basico', value : users - ( estandar + premium)},
      { name: 'Estandar', value : estandar },
      { name: 'Premium', value : premium },
    ];

    return res.status(200).send(numberUsersPerPlan);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { numberUsersPerPlan };