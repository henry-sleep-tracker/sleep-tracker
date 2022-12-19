const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("summary", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    logId: {
      type: DataTypes.INTEGER,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    endTime: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    efficiency: {
      type: DataTypes.INTEGER,
    },
    minutesAsleep: {
      type: DataTypes.INTEGER,
    },
    minutesAwake: {
      type: DataTypes.INTEGER,
    },
    minutesToFallAsleep: {
      type: DataTypes.INTEGER,
    },
    minutesRestless: {
      type: DataTypes.INTEGER,
    },
  });
};
