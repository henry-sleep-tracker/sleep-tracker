const drinkValidator = async (req, res, next) => {
  let { drink, userId } = req.body;

  if (!drink)
    return res.status(400).json({ error: "Ingresa el nombre de la bebida" });

  if (!userId)
    return res
      .status(400)
      .json({ error: "No se puede hacer registro sin un userId" });

  return next();
};

module.exports = { drinkValidator };
