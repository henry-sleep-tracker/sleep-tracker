const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "summary",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      deep: {
        type: DataTypes.INTEGER,
      },
      light: {
        type: DataTypes.INTEGER,
      },
      rem: {
        type: DataTypes.INTEGER,
      },
      wake: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
