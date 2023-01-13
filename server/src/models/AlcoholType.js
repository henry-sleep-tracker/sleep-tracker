const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "alcoholType",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      drink: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: false,
      },
    },
    { timestamps: false }
  );
};
