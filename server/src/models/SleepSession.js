const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "session",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      logId: {
        type: DataTypes.BIGINT,
      },
      startTime: {
        type: DataTypes.STRING,
      },
      endTime: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.BIGINT,
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
    },
    { timestamps: false }
  );
};
