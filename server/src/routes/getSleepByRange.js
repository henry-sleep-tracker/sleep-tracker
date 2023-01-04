const { Router } = require("express");
const router = Router();
<<<<<<< HEAD
const fetch = require("node-fetch");
const { Stage, Session } = require("../db");
const { Op } = require("sequelize");
=======
const { Session } = require("../db");
>>>>>>> development

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;

<<<<<<< HEAD
    const response = await fetch(
      `https://api.fitbit.com/oauth2/token?client_id=238Z55&code=${code}&code_verifier=48601r4939480m540t0v3p6b3z3a4l323s0a6f0q0t4e1e0y133809063f1q2n425j362z0k5t1c1p0m6u2d4w3a6b4p2j4z2f175u182t5p6n576h2p3e2b5j090g68&grant_type=authorization_code`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic MjM4WjU1OmIyYmI2ZDQxNTljODVjZTBkZjYxY2ExN2EwMTJlYzM2",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const getToken = await response.json();

    const token = await getToken.access_token;

    //searches for most recent timestamp

    const mostRecent = await Session.findOne({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
        },
      },
    });

    if (!mostRecent) {
      //if no recent timestamp, adds data from the last 100 days
      const endDate = new Date(Date.now() - 129600000)
        .toISOString()
        .split("T")[0];

      const startDate = new Date(Date.now() - 8640000000)
        .toISOString()
        .split("T")[0];
      console.log("startDate", startDate);

      const data = await fetch(
        `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${endDate}.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const getData = await data.json();
      console.log("dataNORECENT", getData);

      getData.sleep?.map((d) => {
        Session.bulkCreate([
          {
            logId: d.logId,
            startTime: d.startTime,
            endTime: d.endTime,
            duration: d.duration,
            efficiency: d.efficiency,
            minutesAsleep: d.minutesAsleep,
            minutesAwake: d.minutesAwake,
            minutesToFallAsleep: d.minutesToFallAsleep,
          },
        ]);
        d.levels?.data?.map((s) => {
          Stage.bulkCreate([
            {
              date: s.dateTime.split("T")[0],
              time: s.dateTime.split("T")[1].split(".")[0],
              level: s.level,
              seconds: s.seconds,
            },
          ]);
        });
=======
    if (startDate) {
      const searchByRange = await Session.findAll({
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["date", "ASC"]],
>>>>>>> development
      });
    } else {
      // if there's a recent timestamp, then adds from the past 12h to today
      const today = mostRecent?.dataValues?.createdAt
        .toISOString()
        .split("T")[0];

      const startDate = new Date(Date.now() - 28800000)
        .toISOString()
        .split("T")[0];

      const data = await fetch(
        `https://api.fitbit.com/1.2/user/-/sleep/date/${startDate}/${today}.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const getData = await data.json();
      console.log("recentDATA", getData);

      getData.sleep?.map((d) => {
        Session.bulkCreate([
          {
            logId: d.logId,
            startTime: d.startTime,
            endTime: d.endTime,
            duration: d.duration,
            efficiency: d.efficiency,
            minutesAsleep: d.minutesAsleep,
            minutesAwake: d.minutesAwake,
            minutesToFallAsleep: d.minutesToFallAsleep,
          },
        ]);
        d.levels?.data?.map((s) => {
          Stage.bulkCreate([
            {
              date: s.dateTime.split("T")[0],
              time: s.dateTime.split("T")[1].split(".")[0],
              level: s.level,
              seconds: s.seconds,
            },
          ]);
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
