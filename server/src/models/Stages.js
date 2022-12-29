const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
      level: {
        type: DataTypes.STRING,
      },
      seconds: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
