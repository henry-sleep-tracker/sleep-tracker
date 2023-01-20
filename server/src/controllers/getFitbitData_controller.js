const fetch = require("node-fetch");
const { Stage, Session, Steps } = require("../db");
const { Op } = require("sequelize");
const { createToken } = require("../helpers/create_token");

const getFitbitData = async (req, res) => {
  try {
    const { code, userId } = req.body;
    const token = await createToken(code);

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
      const endDate = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];
      const startDate = new Date(Date.now() - 8640000000)
        .toISOString()
        .split("T")[0];

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
      // ---------- Create Session Table --------------//
      const getData = await data.json();
      const sessions = getData.sleep?.map((session) => {
        let obj = {};
        obj["log_id"] = session.logId;
        obj["userId"] = userId;
        obj["date"] = session.dateOfSleep;
        obj["start_time"] = session.startTime;
        obj["end_time"] = session.endTime;
        obj["duration"] = session.duration;
        obj["efficiency"] = session.efficiency;
        obj["summary_deep_min"] = session?.levels?.summary?.deep?.minutes;
        obj["summary_light_min"] = session?.levels?.summary?.light?.minutes;
        obj["summary_rem_min"] = session?.levels?.summary?.rem?.minutes;
        obj["summary_awake_min"] = session?.levels?.summary?.wake?.minutes;
        return obj;
      });
      await Session.bulkCreate(sessions);

      // ---------- Create Stages Table --------------//
      const stages = getData.sleep
        ?.map((session) => {
          return session?.levels?.data?.map((s) => {
            let obj = {};
            obj["userId"] = userId;
            obj["date"] = s.dateTime.split("T")[0];
            obj["time"] = s.dateTime.split("T")[1].split(".")[0];
            obj["level"] = s.level;
            obj["seconds"] = s.seconds;
            return obj;
          });
        })
        .flat(2);
      await Stage.bulkCreate(stages);

      //-------------------------- STEPS ACTIVITY ----------------------------------------------------//
      const stepsData = await fetch(
        `https://api.fitbit.com/1/user/-/activities/steps/date/${startDate}/${endDate}/1d.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const getSteps = await stepsData.json();

      const steps = getSteps["activities-steps"]
        ?.filter((s) => s.value !== "0")
        .map((s) => {
          let obj = {};
          obj["userId"] = userId;
          obj["date"] = s.dateTime;
          obj["steps"] = s.value;
          return obj;
        });
      await Steps.bulkCreate(steps);
      //-------------------------------------------------------------------------------------//
    } else {
      // ------- if there's a recent timestamp, then adds from the past 12h to today -----------------//
      const startDate = mostRecent?.dataValues?.createdAt
        .toISOString()
        .split("T")[0];
      const today = new Date(Date.now() - 43200000).toISOString().split("T")[0];

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
      // ---------- Create Session Table --------------//
      const getData = await data.json();
      const sessions = getData?.sleep?.map((session) => {
        let obj = {};
        obj["log_id"] = session.logId;
        obj["userId"] = userId;
        obj["date"] = session.dateOfSleep;
        obj["start_time"] = session.startTime;
        obj["end_time"] = session.endTime;
        obj["duration"] = session.duration;
        obj["efficiency"] = session.efficiency;
        obj["summary_deep_min"] = session?.levels?.summary?.deep?.minutes;
        obj["summary_light_min"] = session?.levels?.summary?.light?.minutes;
        obj["summary_rem_min"] = session?.levels?.summary?.rem?.minutes;
        obj["summary_awake_min"] = session?.levels?.summary?.wake?.minutes;
        return obj;
      });
      await Session.bulkCreate(sessions);

      const stages = getData?.sleep
        ?.map((session) => {
          return session?.levels?.data?.map((s) => {
            let obj = {};
            obj["userId"] = userId;
            obj["date"] = s.dateTime.split("T")[0];
            obj["time"] = s.dateTime.split("T")[1].split(".")[0];
            obj["level"] = s.level;
            obj["seconds"] = s.seconds;
            return obj;
          });
        })
        .flat(2);
      await Stage.bulkCreate(stages);

      //------------------ STEPS ACTIVITY ---------------------//

      const stepsData = await fetch(
        `https://api.fitbit.com/1/user/-/activities/steps/date/${startDate}/${today}/1d.json`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const getSteps = await stepsData.json();

      const steps = getSteps["activities-steps"]
        ?.filter((s) => s.value !== "0")
        .map((s) => {
          let obj = {};
          obj["userId"] = userId;
          obj["date"] = s.dateTime;
          obj["steps"] = s.value;
          return obj;
        });
      await Steps.bulkCreate(steps);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getFitbitData };
