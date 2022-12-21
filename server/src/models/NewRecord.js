const { DataTypes, Sequelize } = require("sequelize");

const sequelize = Sequelize;

module.exports = (sequelize) => {
  sequelize.define(
    "newRecord",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      dateLastMeal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      timeLastMeal: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      mealDescription: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      physicalActivity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sleepTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      napTime: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      coffeeConsumption: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      alcoholConsumption: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
