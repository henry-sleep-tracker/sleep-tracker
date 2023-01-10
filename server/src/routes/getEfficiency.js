const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Session } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { efficiency } = req.query;
    console.log("efficiency", efficiency);

    if (efficiency) {
      const searchByEfficiency = await Session.findAll({
        where: { efficiency: { [Op.gte]: efficiency } },
        order: [["date", "ASC"]],
      });
      console.log("searchByEfficiency", searchByEfficiency);
      res.status(200).json(searchByEfficiency);
    } else {
      res.status(400).json({ error: "efficiency not found" });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
