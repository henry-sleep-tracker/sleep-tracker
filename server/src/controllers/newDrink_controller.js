const { AlcoholType, User } = require("../db.js");

/* ================== Get Drinks List ==================== */

const getDrinks = async (req, res) => {
  try {
    const drinkRes = await AlcoholType.findAll({
      include: [
        {
          model: User,
        },
      ],
    });

    if (drinkRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    res.status(200).json(drinkRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== New Drink ==================== */

const newDrink = async (req, res) => {
  const { id, userId, drink } = req.body;
  try {
    await AlcoholType.create({ id, drink, userId });
    res.status(200).json({ message: `Bebida creada exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getDrinks, newDrink };
