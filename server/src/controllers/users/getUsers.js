const { User, Plan } = require("../../db.js");

const getUsers = async (req, res) => {
  let { page, limit } = req.query;
  if (!page) page = 1;
  if (!limit) limit = 10;
  page = parseInt(page);
  limit = parseInt(limit);

  try {
    const usersDbResponse = await User.findAll({
      order: [["lastNames", "ASC"]],
      paranoid: false,
      raw: true
    });

    const plans = await Plan.findAll({raw: true});
    
    const users = usersDbResponse.map( user => {
      const plan = plans.find( plan => plan.userId === user.id);
      if(plan){
        return ({ ...user, plan });
      } else {
        return user;
      }
    });

    return res.status(200).send({
      users: users.slice((page - 1) * limit, page * limit),
      total: users.length,
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { getUsers };