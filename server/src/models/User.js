const { DataTypes } = require("sequelize");
const db = require("../db");
let yourDate = new Date();
yourDate = yourDate.toISOString().split("T")[0];
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      names: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      lastNames: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      lastConnection: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: yourDate,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
