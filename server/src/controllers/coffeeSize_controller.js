const { CoffeeSize, User } = require("../db.js");

/* ================== Get List Size ==================== */

const getCoffeeSizeList = async (req, res) => {
  try {
    const coffeRes = await CoffeeSize.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    if (coffeRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(coffeRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Size ==================== */

const newCoffeeSize = async (req, res) => {
  const { id, userId, size } = req.body;
  try {
    await CoffeeSize.create({ id, size, userId });
    res.status(200).json({ message: `Registro creado exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getCoffeeSizeList, newCoffeeSize };
