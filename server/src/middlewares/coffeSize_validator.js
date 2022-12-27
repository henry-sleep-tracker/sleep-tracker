const { CoffeeSize } = require('../db.js');

const coffeeSizeValidator = async (req, res, next) => {
  const { id, size } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ error: 'Ingresa un id para el nuevo registro' });

  if (!size)
    return res.status(400).json({ error: 'Ingresa la medida del cafe' });

  const idDB = await CoffeeSize.findByPk(id);

  if (idDB) return res.status(400).json({ error: `id: ${id} ya existe` });

  const sizeRes = await CoffeeSize.findAll({
    where: {
      size: size,
    },
  });

  if (sizeRes.length >= 1)
    return res
      .status(400)
      .json({ error: `El registro de ${size} no puede duplicarse` });

  return next();
};

module.exports = { coffeeSizeValidator };
