const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Vote } = require('../models');

// gets all the recipes
router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'title',
            'ingredients',
            'directions',
            'user_id',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Recipe,
                        attributes: ['title']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Vote,
                attributes: ['id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Recipe,
                        attributes: ['title']
                    }
                ]
            }
        ]
    })
    .then(recipeData => {
        const recipe = recipeData.map(recipe => recipe.get({ plain: true }));
        res.render('homepage', { 
          recipe,
          loggedIn: req.session.loggedIn
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// gets a recipe by id
router.get('/post/:id', (req, res) => {
    Recipe.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'ingredients',
            'directions',
            'user_id',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE recipe.id = vote.recipe_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Recipe,
                        attributes: ['title']
                    }
                ]
            },
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Vote,
                attributes: ['id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Recipe,
                        attributes: ['title']
                    }
                ]
            }
        ]
    })
    .then(recipeData => {
        if (!recipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
        const recipe = recipeData.get({ plain: true });
        res.render('single-recipe', { 
          recipe,
          loggedIn: req.session.loggedIn 
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// the login route for the user
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;