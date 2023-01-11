const { Router } = require("express");
const { Op } = require("sequelize");
const router = Router();
const { Stage, Session } = require("../db");

const getSleepByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (date) {
      const searchByDate = await Stage.findAll({
        where: { date: date },
        order: [["time", "ASC"]],
      });
      res.status(200).json(searchByDate);
    } else {
      res.status(400).json({ error: "date not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const getSleepByRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (startDate && endDate) {
      const searchByRange = await Session.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["date", "ASC"]],
      });
      res.status(200).json(searchByRange);
    } else if (startDate) {
      const searchByDay = await Session.findAll({
        where: { date: startDate },
        order: [["date", "ASC"]],
      });
      res.status(200).json(searchByDay);
    }
  } catch (error) {
    console.error(error);
  }
};
module.exports = { getSleepByDate, getSleepByRange };
