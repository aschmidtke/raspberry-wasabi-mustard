const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipe, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

// gets all the user's recipes
router.get('/', withAuth, (req, res) => {
    Recipe.findAll({
        where: {
            user_id: req.session.user_id
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
        const recipe = recipeData.map(recipe => recipe.get({ plain: true }));
        res.render('dashboard', { 
          recipe,
          loggedIn: true
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// finds the recipe by the primary key
router.get('/edit/:id', withAuth, (req, res) => {
    Recipe.findByPk(req.params.id, {
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
        if (recipeData) {
          const recipe = recipeData.get({ plain: true });
  
          res.render('edit-recipe', {
            recipe,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
});

router.get('/new', (req, res) => {
    res.render('new-recipe');
});

module.exports = router;