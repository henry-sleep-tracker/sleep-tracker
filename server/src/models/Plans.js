const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "plans",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        required: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        enum: ["Basico", "Estandar", "Premium"],
        required: true,
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
