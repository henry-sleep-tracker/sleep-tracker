const { CoffeeSize } = require('../db.js');

/* ================== Get List Size ==================== */

const getCoffeeSizeList = async (req, res) => {
  try {
    const coffeRes = await CoffeeSize.findAll();
    res.status(200).json(coffeRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Size ==================== */

const newCoffeeSize = async (req, res) => {
  const { id, size } = req.body;
  try {
    await CoffeeSize.create({ id, size });
    res.status(200).json({ message: `Registro creado exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getCoffeeSizeList, newCoffeeSize };
