const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "stage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
      },
      stage: {
        type: DataTypes.STRING,
      },
      durationSeconds: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
