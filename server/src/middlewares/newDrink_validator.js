const { AlcoholType } = require('../db.js');

const drinkValidator = async (req, res, next) => {
  const { id, drink } = req.body;

  if (!id)
    return res
      .status(400)
      .json({ error: 'Ingresa un id para el nuevo registro' });
  if (!drink)
    return res.status(400).json({ error: 'Ingresa el nombre de la bebida' });

  const idDB = await AlcoholType.findByPk(id);

  if (idDB) return res.status(400).json({ error: `id: ${id} ya existe` });

  const drinkRes = await AlcoholType.findAll({
    where: {
      drink: drink,
    },
  });

  if (drinkRes.length >= 1)
    return res
      .status(400)
      .json({ error: `El registro de ${drink} no puede duplicarse` });

  return next();
};

module.exports = { drinkValidator };
