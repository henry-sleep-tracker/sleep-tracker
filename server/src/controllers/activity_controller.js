const { Activity, User } = require("../db.js");

/* ================== Get List Activites =================== */

const getAcitivities = async (req, res) => {
  try {
    const activityRes = await Activity.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    if (activityRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(activityRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Activity ================== */

const newActivity = async (req, res) => {
  const { id, userId, activity } = req.body;
  try {
    await Activity.create({ id, activity, userId });
    return res.status(200).json({ message: "Actividad creada exitosamente" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getAcitivities, newActivity };
