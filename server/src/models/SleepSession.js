const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("session", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    log_id: {
      type: DataTypes.BIGINT,
      unique: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    star_time: {
      type: DataTypes.STRING,
    },
    end_time: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.BIGINT,
    },
    efficiency: {
      type: DataTypes.INTEGER,
    },
    summary_deep_min: {
      type: DataTypes.INTEGER,
    },
    summary_light_min: {
      type: DataTypes.INTEGER,
    },
    summary_rem_min: {
      type: DataTypes.INTEGER,
    },
    summary_awake_min: {
      type: DataTypes.INTEGER,
    },
  });
};
