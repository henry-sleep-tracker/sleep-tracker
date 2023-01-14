const { Op } = require("sequelize");
const { User, Plan } = require("../../db.js");

const getUsers = async (req, res) => {
  let { nationality, name, isAdmin, page, limit } = req.query;

  if (!page) {
    page = 1;
  };
  if (!limit) {
    limit = 5;
  };
  page = parseInt(page);
  limit = parseInt(limit);

 if (!nationality && !name && !isAdmin) {
  
  try {
    const responseNat = await User.findAll({
      include: [
        {
          model: Plan,
        },
      ], 
      order: [["lastNames", "ASC"]],
      paranoid: false,
    });

    return res.status(200).json({
      users: responseNat.slice((page - 1) * limit, page * limit),
      total: responseNat.length,
    });
  } catch (error) {
    console.log(error);
  }
 }

  if (nationality && !name && !isAdmin) {
    try {
      const responseNat = await User.findAll({
        include: [
          {
            model: Plan,
          },
        ],
        where: {
          nationality: nationality,
        },

        order: [["lastNames", "ASC"]],
        paranoid: false,
      });

      return res.status(200).json({
        users: responseNat.slice((page - 1) * limit, page * limit),
        total: responseNat.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (!nationality && !name && isAdmin) {
    try {
      const responseAd = await User.findAll({
        include: [
          {
            model: Plan,
          },
        ],
        where: {
          isAdmin: isAdmin,
        },

        order: [["lastNames", "ASC"]],
        paranoid: false,
      });

      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (nationality && !name && isAdmin) {
    try {
      const responseAd = await User.findAll({
        include: [
          {
            model: Plan,
          },
        ],
        where: {
          [Op.and]: [
            {
              isAdmin: isAdmin,
              nationality: nationality,
            },
          ],
        },

        order: [["lastNames", "ASC"]],
        paranoid: false,
      });

      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (!nationality && name && !isAdmin) {
    if(name === 'Basico'){
      try {
        const responseAd = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],
          order: [["lastNames", "ASC"]],
          paranoid: false,
        });

        const users = responseAd.filter( user => user.plan === null )

        return res.status(200).json({
          users: users.slice((page - 1) * limit, page * limit),
          total: users.length,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseAd = await User.findAll({
          include: [
            {
              model: Plan,
              where: {
                name: name,
              },
            },
          ],
          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
        });
      } catch (error) {
        console.log(error);
      }
    }

  }
  if (!nationality && name && isAdmin) {
    try {
      const responseAd = await User.findAll({
        include: [
          {
            model: Plan,
            where: {
              name: name,
            },
          },
        ],

        where: { isAdmin: isAdmin },

        order: [["lastNames", "ASC"]],
        paranoid: false,
      });
      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (nationality && name && !isAdmin) {
    if(name === 'Basico'){
      try {
        const responseAd = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],
          order: [["lastNames", "ASC"]],
          paranoid: false,
        });

        const users = responseAd.filter( user => user.plan === null )

        return res.status(200).json({
          users: users.slice((page - 1) * limit, page * limit),
          total: users.length,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const responseAd = await User.findAll({
          include: [
            {
              model: Plan,
              where: {
                name: name,
              },
            },
          ],

          where: { nationality: nationality },

          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (nationality && name && isAdmin) {
    try {
      const responseAd = await User.findAll({
        include: [
          {
            model: Plan,
            where: {
              name: name,
            },
          },
        ],

        where: {
          [Op.and]: [
            {
              isAdmin: isAdmin,
              nationality: nationality,
            },
          ],
        },

        order: [["lastNames", "ASC"]],
        paranoid: false,
      });
      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = { getUsers };
