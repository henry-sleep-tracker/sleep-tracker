const { Router } = require("express");
const router = Router();
const { Stage } = require("../db");

router.get("/", async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      const searchByDate = await Stage.findAll({
        where: { date: date },
        order: [["time", "ASC"]],
      });
      console.log("searchByDate", searchByDate);
      res.status(200).json(searchByDate);
    } else {
      res.status(400).json({ error: "date not found" });
    }
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
