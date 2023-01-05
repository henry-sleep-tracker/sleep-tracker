const { DataTypes, INTEGER } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "coffeeSize",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: false,
      },
    },
    { timestamps: false }
  );
};
