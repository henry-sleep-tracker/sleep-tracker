const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define(
    'activity',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      activity: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
