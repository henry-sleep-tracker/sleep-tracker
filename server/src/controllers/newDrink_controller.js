const { AlcoholType, User } = require("../db.js");

/* ================== Get Drinks List ==================== */

const getDrinks = async (req, res) => {
  try {
    const drinkRes = await AlcoholType.findAll({
      /* include: [
        {
          model: User,
        },
      ], */
    });

    if (drinkRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(drinkRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const drink_type_by_id = async (req, res) => {
  const { id } = req.params;
  try {
    const resDb = await AlcoholType.findAll({
      /* include: [{ model: User }], */
      where: { userId: id },
    });

    if (resDb.length < 1) {
      return res
        .status(200)
        .json({ message: `No existen tipos de bebidas para el userId: ${id}` });
    }

    return res.status(200).json(resDb);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== New Drink ==================== */

const newDrink = async (req, res) => {
  const { drink, userId } = req.body;
  try {
    await AlcoholType.create({ drink, userId });
    res.status(200).json({ message: `Bebida creada exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getDrinks, drink_type_by_id, newDrink };
