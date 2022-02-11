const router = require('express').Router();
const { Project, User, Donation } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all projects
router.get('/', (req, res) => {
    Project.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'user_id',
            'fund_needed',
            'created_at'
        ],
        //sorting by time created in a descending order
      order: [['created_at', 'DESC']],
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
        },
      ]
    })
      .then(dbProjectData => res.json(dbProjectData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get a single project
  router.get('/:id', (req, res) => {
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
          model: User,
          attributes: ['name']
        },
        {
          model: Donation,
          attributes: ['id', 'amount', 'created_at'],
          include: {
            model: User,
            attributes: ['name']
          }
        }
      ]
    })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No project found with this id' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//POST creates new project
router.post('/', withAuth, (req, res) => {
    Project.create({
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
      fund_needed: req.session.fund_needed,

    })
      .then(dbProjectData => res.json(dbProjectData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//PUT updates a project
router.put('/:id', withAuth, (req, res) => {
    Project.update({
        title: req.body.title,
        description: req.body.description,
        fund_needed: req.session.fund_needed,
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No project found with this id' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  //Delete a project by id
  router.delete('/:id', withAuth, (req, res) => {
    Project.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbProjectData => {
        if (!dbProjectData) {
          res.status(404).json({ message: 'No project found with this id' });
          return;
        }
        res.json(dbProjectData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;