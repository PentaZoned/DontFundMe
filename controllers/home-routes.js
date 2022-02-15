const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User, Donation } = require('../models');

router.get('/', async (req, res) => {

    // Pass serialized data and session flag into template
    res.render('landingpage', { 
      logged_in: req.session.logged_in 
    });
});

//route to signin page
router.get('/signin', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('signin');
  });

//route to signup page
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('signup');
  });

//route to project create page
router.get('/projects/create', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('createproject');
});

router.get('/projects', async (req, res) => {
  try {
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const projects = projectData.map((project) => project.get({ plain: true }));

    res.render('all-projects', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/project/:id', (req, res) => {
//   Project.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'description',
//       'user_id',
//       'fund_needed',
//       'created_at'
//     ],
//     include: [
//       {
//         model: Donation,
//         attributes: ['id', 'amount', 'created_at'],
//         include: {
//             model: User,
//             attributes: ['name']
//         }
//         },
//         {
//           model: User,
//           attributes: ['name']
//         }
//       ]
//     })
//     .then(dbProjectData => {
//       if (!dbProjectData) {
//         res.status(404).json({ message: 'No project found with this id' });
//         return;
//       }

  router.get('/project/:id', (req, res) => {
    Project.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'description',
        'user_id',
        'fund_needed',
        'created_at'
      ],
      include: [
        {
          model: Donation,
          attributes: ['id', 'amount', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        },
        {
          model: User,
          attributes: ['name']
        }
      ]
    })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No project found with this id' });
          return;
        }

        // serialize the data
        const post = dbProjectData.get({ plain: true });

        // pass data to template
        res.render('project', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router