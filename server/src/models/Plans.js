const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "plans",
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
