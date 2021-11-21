const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Recipe, Comment, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

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
        .then(recipeData => res.json(recipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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

router.post('/', withAuth, (req, res) => {
    Recipe.create({
        title: req.body.title,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
        user_id: req.session.user_id
    })
        .then(recipeData => res.json(recipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/upvote', withAuth, (req, res) => {
    Recipe.upvote({ ...req.body, user_id: req.session.user_id }, { Recipe, Comment, User })
        .then(updatedRecipeData => res.json(updatedRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// to update the recipes
router.put('/:id', withAuth, (req, res) => {
    Recipe.update(
        {
            title: req.body.title
        },
        {
            ingredients: req.body.ingredients
        },
        {
            directions: req.body.directions
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(recipeData => {
            if (!recipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(recipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(recipeData => {
            if (!recipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(recipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;