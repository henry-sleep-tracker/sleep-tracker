const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Session } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (startDate) {
      const searchByRange = await Session.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["date", "ASC"]],
      });
      res.status(200).json(searchByRange);
    } else {
      res.status(400).json({ error: "date not found" });
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
