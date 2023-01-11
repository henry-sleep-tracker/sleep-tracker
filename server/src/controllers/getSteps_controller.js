const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Steps } = require("../db");

const getSteps = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (startDate && endDate) {
      const searchByRange = await Steps.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["date", "ASC"]],
      });
      res.status(200).json(searchByRange);
    } else if (startDate) {
      const searchByDay = await Steps.findAll({
        where: { date: startDate },
        order: [["date", "ASC"]],
      });
      res.status(200).json(searchByDay);
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getSteps };
