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
      alcoholType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
