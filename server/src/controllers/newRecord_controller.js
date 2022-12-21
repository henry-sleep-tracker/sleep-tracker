const { NewRecord } = require('../db.js');

const post_new_record = async (req, res) => {
  const {
    dateMeal,
    timeMeal,
    description,
    activity,
    sleepTime,
    napTime,
    coffee,
    alcohol,
  } = req.body;

  try {
    const newRecord = await NewRecord.create({
      dateMeal,
      timeMeal,
      description,
      activity,
      sleepTime,
      napTime,
    });

    await newRecord.addCoffeSize(coffee);
    await newRecord.addAlcoholTypes(alcohol);

    res.status(200).json({ message: `Registro creado exitosamente` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { post_new_record };
