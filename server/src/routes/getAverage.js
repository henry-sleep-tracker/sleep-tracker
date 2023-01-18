const { Sequelize } = require("sequelize");
const { Router } = require("express");
const router = Router();
const { Session } = require("../db");

router.get("/", async (req, res) => {
  try {
    const response = await Session.findAll({
      attributes: [
        [Sequelize.fn("AVG", Sequelize.col("duration")), "avgSleepDuration"],
      ],
    });
    // res.status(200).json(response);
  } catch (error) {
    console.error(error);
  }
});

//'SELECT avg("duration") FROM "stages" AS "stage"
module.exports = router;
