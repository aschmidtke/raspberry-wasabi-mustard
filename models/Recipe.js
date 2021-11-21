const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Recipe extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        recipe_id: body.recipe_id
      }).then(() => {
        return Recipe.findOne({
          where: {
            id: body.recipe_id
          },
          attributes: [
            'id',
            'title',
            'created_at',
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'),
              'vote_count'
            ]
          ]
        });
      });
    }
  }

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    directions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }

},
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe'
    }
);


module.exports = Recipe;