const { Router } = require("express");
const router = Router();
const { Steps } = require("../db");

const getSteps = async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      const searchByDate = await Steps.findAll({
        where: { date: date },
      });
      res.status(200).json(searchByDate);
    } else {
      res.status(400).json({ error: "date not found" });
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getSteps };
