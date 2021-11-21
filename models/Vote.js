const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vote extends Model {}

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            refereces: {
                model: 'user',
                key: 'id'
            }
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            allowNUll: false,
            references: {
                model: 'recipe',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;