const { Op } = require("sequelize");
const { User, Plan } = require("../../db.js");

const getUsers = async (req, res) => {
  const { nationality, name, isAdmin, page, limit } = req.query;

  if (!page) {
    let page = 1;
  };
  if (!limit) {
    let limit = 5;
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
      raw: true
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
        raw: true
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
        raw: true
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
        raw: true
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
        raw: true
      });
      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
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
        raw: true
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
        raw: true
      });
      return res.status(200).json({
        users: responseAd.slice((page - 1) * limit, page * limit),
        total: responseAd.length,
      });
    } catch (error) {
      console.log(error);
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
        raw: true
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
