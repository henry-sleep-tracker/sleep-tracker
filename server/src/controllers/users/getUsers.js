const { Op } = require("sequelize");
const { User, Plan } = require("../../db.js");

const getUsers = async (req, res) => {
  let { nationality, name, lastNames, page, limit } = req.query;

  if (!page) {
    page = 1;
  };
  if (!limit) {
    limit = 5;
  };
  page = parseInt(page);
  limit = parseInt(limit);

  if (!nationality && !name && !lastNames) {

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
  if (nationality && !name && !lastNames) {
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
  if (!nationality && !name && lastNames) {
    try {
      const responseAd = await User.findAll({
        include: [
          {
            model: Plan,
          },
        ],
        where: {
          lastNames: {
            [Op.iLike]: `${lastNames}%`
          }
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
  if (nationality && !name && lastNames) {
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
              lastNames: {
                [Op.iLike]: `${lastNames}%`
              },
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
  if (!nationality && name && !lastNames) {

    if(name === 'Ninguno'){
      try {
        const responseDb = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],
          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        const responseAd = responseDb.filter( user => user.plan === null );
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
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
    };

  }
  if (!nationality && name && lastNames) {
    if(name === 'Ninguno'){
      try {
        const responseDb = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],

          where: { 
            lastNames: {
              [Op.iLike]: `${lastNames}%`
            } 
          },

          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        const responseAd = responseDb.filter( user => user.plan === null );
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
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

          where: { 
            lastNames: {
              [Op.iLike]: `${lastNames}%`
            } 
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
    };
  }
  if (nationality && name && !lastNames) {
    if(name === 'Ninguno'){
      try {
        const responseDb = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],

          where: { nationality: nationality },

          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        const responseAd = responseDb.filter( user => user.plan === null );
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
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
    };
  }
  if (nationality && name && lastNames) {
    if(name === 'Ninguno'){
      try {
        const responseDb = await User.findAll({
          include: [
            {
              model: Plan,
            },
          ],

          where: {
            [Op.and]: [
              {
                lastNames: {
                  [Op.iLike]: `${lastNames}%`
                },
                nationality: nationality,
              },
            ],
          },

          order: [["lastNames", "ASC"]],
          paranoid: false,
        });
        const responseAd = responseDb.filter( user => user.plan === null );
        return res.status(200).json({
          users: responseAd.slice((page - 1) * limit, page * limit),
          total: responseAd.length,
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
  
          where: {
            [Op.and]: [
              {
                lastNames: {
                  [Op.iLike]: `${lastNames}%`
                },
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
    };
  }
};
module.exports = { getUsers };
