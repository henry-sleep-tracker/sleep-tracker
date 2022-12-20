const {DataTypes} = require('sequelize');

module.exports = sequelize => {
  sequelize.define('coffeeSize',
  {
    id:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    size:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    }
  },{timestamps:false});
}