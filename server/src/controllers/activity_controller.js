const { Activity } = require("../db.js");

/* ================== Get List Activites =================== */

const getAcitivities = async (req, res) => {
  try {
    const activityRes = await Activity.findAll();
    res.status(200).json(activityRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Activity ================== */

const newActivity = async (req, res) => {
  const { id, activity } = req.body;
  try {
    await Activity.create({ id, activity });
    return res.status(200).json({ message: "Actividad creada exitosamente" });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getAcitivities, newActivity };
