const { Op } = require("sequelize");
const { User } = require("../../db.js");

const newUsersLastWeek = async (req, res) => {

  const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  
  let start = new Date();
  start.setDate(start.getDate() - 7);

  try {
    const users = await User.findAll({
      where: {
        createdAt: {
          [Op.gt]: start
        }
      },
      attributes: [ 'id', 'createdAt' ]
    });

    const week = [];
    
    for (let d = 0; d < 7; d++) {
      let inicio = new Date();
      inicio.setDate(inicio.getDate() - 7 + d);

      let cantidad = users.filter( user => {
          let userCreatedAt = new Date(user.createdAt);
          return userCreatedAt.getDate() === inicio.getDate()? true : false;
        }
      );
      week.push({ day: `${days[inicio.getDay()]} ${inicio.getDate()}`, usuarios: cantidad.length});
    }
    return res.status(200).send(week);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { newUsersLastWeek };