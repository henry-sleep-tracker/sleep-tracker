const { DataTypes, INTEGER } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'coffeeSize',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
