const { Activity } = require("../db.js");

const activityValidator = async (req, res, next) => {
  const { id, activity } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ error: "Ingresa un id para el nuevo registro" });

  if (!activity)
    return res
      .status(400)
      .json({ error: "Ingresa descripcion de la actividad" });

  const idDB = await Activity.findByPk(id);

  if (idDB) return res.status(400).json({ error: `id: ${id} ya existe` });

  const activityRes = await Activity.findAll({
    where: {
      activity: activity,
    },
  });

  if (activityRes.length >= 1)
    return res
      .status(400)
      .json({ error: `El registro de ${activity} no puede duplicarse` });

  return next();
};

module.exports = { activityValidator };
