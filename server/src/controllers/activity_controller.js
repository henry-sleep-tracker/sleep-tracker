const { Activity, User } = require("../db.js");
const { sortByName } = require("../helpers/sort_by_name_activity.js");

/* ================== Get List Activites =================== */

const getAcitivities = async (req, res) => {
  try {
    const activityRes = await Activity.findAll({
      /* include: [
        {
          model: User,
        },
      ], */
    });

    if (activityRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(activityRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const activities_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const resDb = await Activity.findAll({
      /* include: [{ model: User }], */
      where: { userId: id },
    });

    if (resDb.length < 1) {
      return res
        .status(200)
        .json({ message: `No existen actividades para el userId: ${id}` });
    }
    return res.status(200).json(sortByName(resDb));
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Activity ================== */

const newActivity = async (req, res) => {
  const { activity, userId } = req.body;
  try {
    await Activity.create({ activity, userId });
    return res.status(200).json({ message: "Actividad creada exitosamente" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getAcitivities, activities_by_id, newActivity };
