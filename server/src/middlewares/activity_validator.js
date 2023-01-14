const activityValidator = async (req, res, next) => {
  let { activity, userId } = req.body;

  if (!activity)
    return res
      .status(400)
      .json({ error: "Ingresa descripcion de la actividad" });

  if (!userId)
    return res
      .status(400)
      .json({ error: "No se puede hacer registro sin un userId" });

  return next();
};

module.exports = { activityValidator };
