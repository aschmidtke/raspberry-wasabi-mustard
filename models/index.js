const User = require('./User');
const Recipe = require('./Recipe');
const Vote = require('./Vote');
const Comment = require('./Comment');
const sequelize = require('../config/connection');

User.hasMany(Recipe, {
    foreignKey: 'user_id'
})

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Recipe.hasMany(Vote, {
    foreignKey: 'recipe_id'
});

Recipe.hasMany(Comment, {
    foreignKey: 'recipe_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

module.exports = {User, Recipe, Vote, Comment};