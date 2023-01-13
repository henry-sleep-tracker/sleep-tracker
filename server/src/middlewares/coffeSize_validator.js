const coffeeSizeValidator = async (req, res, next) => {
  let { size, userId } = req.body;

  if (!size)
    return res.status(400).json({ error: "Ingresa la medida del cafe" });

  if (!userId)
    return res
      .status(400)
      .json({ error: "No se puede hacer registro sin un userId" });

  return next();
};

module.exports = { coffeeSizeValidator };
