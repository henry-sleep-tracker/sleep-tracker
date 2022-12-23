const { AlcoholType } = require('../db.js');

/* ================== Get Drinks List ==================== */

const getDrinks = async (req, res) => {
  try {
    const drinkRes = await AlcoholType.findAll();
    res.status(200).json(drinkRes);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== New Drink ==================== */

const newDrink = async (req, res) => {
  const { id, drink } = req.body;
  try {
    await AlcoholType.create({ id, drink });
    res.status(200).json({ message: `Bebida creada exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getDrinks, newDrink };
