const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
