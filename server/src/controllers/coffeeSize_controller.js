const { CoffeeSize, User } = require("../db.js");

/* ================== Get List Size ==================== */

const getCoffeeSizeList = async (req, res) => {
  try {
    const coffeRes = await CoffeeSize.findAll({
      /*  include: [
        {
          model: User,
        },
      ], */
    });

    if (coffeRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(coffeRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const coffee_size_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const resDb = await CoffeeSize.findAll({
      /* include: [{ model: User }], */
      where: { userId: id },
    });

    if (resDb.length < 1) {
      return res
        .status(200)
        .json({ message: `No existen medidas de cafe para el userId: ${id}` });
    }

    return res.status(200).json(resDb);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Size ==================== */

const newCoffeeSize = async (req, res) => {
  const { size, userId } = req.body;
  try {
    await CoffeeSize.create({ size, userId });
    res.status(200).json({ message: `Registro creado exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getCoffeeSizeList, coffee_size_by_id, newCoffeeSize };
