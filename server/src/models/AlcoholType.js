const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'alcoholType',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      drink: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
