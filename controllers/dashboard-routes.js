const router = require('express').Router();
const sequelize = require('../config/connection');
const { Project, User, Donation } = require('../models');
// redirect unauthenticated users to the login page
const withAuth = require('../utils/auth')

// A route to render the dashboard page, only for a logged in user
router.get('/', withAuth, (req, res) => {
    Project.findAll({
      where: {
        user_id: req.session.user_id
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
        // serialize data before passing to template
        const projects = dbProjectData.map(project => project.get({ plain: true }));
        res.render('dashboard', { projects, logged_in: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // router.get('/create/', withAuth, (req, res) => {
  //   Project.findAll({
  //     where: {
  //       // use the ID from the session
  //       user_id: req.session.user_id
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
  //           model: User,
  //           attributes: ['name']
  //         }
  //       },
  //       {
  //         model: User,
  //         attributes: ['name']
  //       }
  //     ]
  //   })
  //     .then(dbProjectData => {
  //       // serialize data before passing to template
  //       const projects = dbProjectData.map(project => project.get({ plain: true }));
  //       res.render('new-project', { projects, loggedIn: true });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // });

// A route to edit a projet
router.get('/edit/:id', withAuth, (req, res) => {
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
      // if no project by that id exists, return an error
      if (!dbProjectData) {
        res.status(404).json({ message: 'No porject found with this id' });
        return;
      }
      // serialize data before passing to template
      const project = dbProjectData.get({ plain: true });
      res.render('edit-project', { project, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// A route to edit the logged in user
router.get('/edituser', withAuth, (req, res) => {
  // Acess the User model and run the findOne() method to get a single user based on parameters
  User.findOne({
    // when the data is sent back, exclude the password property
    attributes: { exclude: ['password'] },
    where: {
      // use id as the parameter for the request
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        // if no user is found, return an error
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      // otherwise, return the data for the requested user
      const user = dbUserData.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
      // if there is a server error, return that error
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;