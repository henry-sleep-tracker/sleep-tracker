const {DataTypes, Sequelize} = require('sequelize');

const sequelize = Sequelize;

module.exports = sequelize => {
    sequelize.define('newRecord',
    {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        dateLastMeal:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeLastMeal:{
            type: DataTypes.TIME,
            allowNull: false
        },
        mealDescription:{
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        physicalActivity:{
            type: DataTypes.NUMBER,
            allowNull: true
        },
        sleepTime:{
            type: DataTypes.NUMBER,
            allowNull: false
        },
        napTime:{
            type: DataTypes.ARRAY(DataTypes.NUMBER),
            allowNull: true
        },
        coffeeConsumption:{
            DataTypes: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        alcoholConsumption:{
            DataTypes: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
    },
    {timestamps: false});
}