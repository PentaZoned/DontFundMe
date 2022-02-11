const router = require('express').Router();
const { Donation } = require('../../models');
const withAuth = require('../../utils/auth');

//GET get all donations
router.get('/', (req, res) => {
    Donation.findAll({})
      .then(dbDonationData => res.json(dbDonationData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.post('/', withAuth, (req, res) => {
  // check the session
  if (req.session) {
    Donation.create({
      amount: req.body.amount,
      project_id: req.body.project_id,
      // use the id from the session
      user_id: req.session.user_id,
    })
      .then(dbDonationData => res.json(dbDonationData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

//Delete the donation by id
router.delete('/:id', withAuth, (req, res) => {
    Donation.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbDonationData => {
          if (!dbDonationData) {
            res.status(404).json({ message: 'No donation found with this id' });
            return;
          }
          res.json(dbDonationData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;