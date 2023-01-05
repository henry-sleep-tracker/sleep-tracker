const { DataTypes } = require("sequelize");

module.exports = sequelize => {
  sequelize.define(
    "activity",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      activity: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: false,
      },
    },
    { timestamps: false }
  );
};
