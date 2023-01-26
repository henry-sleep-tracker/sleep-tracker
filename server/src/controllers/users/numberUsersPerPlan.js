const { User, Plan } = require("../../db.js");

const numberUsersPerPlan = async (req, res) => {

  try {
    const totalUsers = await User.count();

    const basico = await User.count({
      include: [{
        model: Plan,
        required: true,
        attributes: ['name'],
        where: {
           name: 'Basico'
        }
      }]
    });

    const estandar = await User.count({
      include: [{
        model: Plan,
        required: true,
        attributes: ['name'],
        where: {
           name: 'Estandar'
        }
      }]
    });

    const premium = await User.count({
      include: [{
        model: Plan,
        required: true,
        attributes: ['name'],
        where: {
           name: 'Premium'
        }
      }]
    });
 
    let numberUsersPerPlan = [
      { name: 'Ninguno', value : totalUsers - (basico+estandar+premium) },
      { name: 'Basico', value : basico },
      { name: 'Estandar', value : estandar },
      { name: 'Premium', value : premium },
    ];

    return res.status(200).send(numberUsersPerPlan);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { numberUsersPerPlan };