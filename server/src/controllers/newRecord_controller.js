const {
  NewRecord,
  CoffeeSize,
  AlcoholType,
  Activity,
  User,
} = require("../db.js");
const { time_convert } = require("../helpers/time_convert.js");
const { tConvert } = require("../helpers/convert_24_to_12hrs.js");

/* ================== Get List All Records =================== */

const getRecords = async (req, res) => {
  const finalResult = [];

  try {
    const recordsRes = await NewRecord.findAll({
      include: [
        {
          model: CoffeeSize,
          attributes: ["size"],
          through: { attributes: [] },
        },
        {
          model: AlcoholType,
          attributes: ["drink"],
          through: { attributes: [] },
        },
        {
          model: Activity,
          attributes: ["activity"],
          through: { attributes: [] },
        },
        {
          model: User,
        },
      ],
      /* include: [
        {
          all: true,
        },
      ], */
    });

    if (recordsRes.length < 1) {
      return res.status(200).json({ message: `No existen registros` });
    }

    for (let i = 0; i < recordsRes.length; i++) {
      let joinActivity = [];
      let timeActivity = "";
      let typeActivity = "";
      let joinCoffee = [];
      let coffeeCups = "";
      let coffeeSizes = "";
      let joinDrinks = [];
      let quantityDrinks = "";
      let typeDrinks = "";

      if (recordsRes[i].timeActivity.length >= 1) {
        timeActivity = recordsRes[i].timeActivity.flat();
        typeActivity = recordsRes[i].activities.map(e => e.activity).flat();

        for (let i = 0; i < timeActivity.length; i++) {
          joinActivity.push(`${timeActivity[i]} min de ${typeActivity[i]}`);
        }
      }

      if (recordsRes[i].coffeeCups.length >= 1) {
        coffeeCups = recordsRes[i].coffeeCups.flat();
        coffeeSizes = recordsRes[i].coffeeSizes.map(e => e.size).flat();

        for (let i = 0; i < coffeeCups.length; i++) {
          coffeeCups[i] > 1
            ? joinCoffee.push(`${coffeeCups[i]} tazas de ${coffeeSizes[i]}`)
            : joinCoffee.push(`${coffeeCups[i]} taza de ${coffeeSizes[i]}`);
        }
      }

      if (recordsRes[i].drinks.length >= 1) {
        quantityDrinks = recordsRes[i].drinks.flat();
        typeDrinks = recordsRes[i].alcoholTypes.map(e => e.drink).flat();

        for (let i = 0; i < quantityDrinks.length; i++) {
          quantityDrinks[i] > 1
            ? joinDrinks.push(`${quantityDrinks[i]} ${typeDrinks[i]}s`)
            : joinDrinks.push(`${quantityDrinks[i]} ${typeDrinks[i]}`);
        }
      }

      let obj = {
        id: recordsRes[i].id,
        userId: recordsRes[i].userId,
        dateMeal: recordsRes[i].dateMeal,
        timeMeal: tConvert(recordsRes[i].timeMeal),
        description:
          recordsRes[i].description === ""
            ? "sin registro"
            : recordsRes[i].description,
        sleepTime: `${time_convert(recordsRes[i].sleepTime)}`,
        napTime:
          recordsRes[i].napTime.length < 1
            ? "sin registro"
            : recordsRes[i].napTime.map(e => `${e} min. de siesta`),
        activities: joinActivity.length < 1 ? "sin registro" : joinActivity,
        coffees: joinCoffee.length < 1 ? "sin registro" : joinCoffee,
        drinks: joinDrinks.length < 1 ? "sin registro" : joinDrinks,
      };
      finalResult.push(obj);
    }
    res.status(200).json(finalResult);
  } catch (err) {
    return res.status(400).json(err);
  }
};

/* ================== Create New Record =================== */

const post_new_record = async (req, res) => {
  const {
    dateMeal,
    timeMeal,
    description,
    sleepTime,
    napTime,
    timeActivity,
    coffeeCups,
    drinks,
    coffee,
    drink,
    activity,
    userId,
  } = req.body;

  try {
    const newRecord = await NewRecord.create({
      dateMeal,
      timeMeal,
      description,
      sleepTime,
      napTime,
      timeActivity,
      coffeeCups,
      drinks,
      userId,
    });

    await newRecord.addCoffeeSize(coffee);
    await newRecord.addAlcoholType(drink);
    await newRecord.addActivity(activity);

    res.status(200).json({ message: `Registro creado exitosamente` });
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = { getRecords, post_new_record };
