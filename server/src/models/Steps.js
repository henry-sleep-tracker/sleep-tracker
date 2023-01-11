const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("steps", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    steps: {
      type: DataTypes.INTEGER,
    },
  });
};
