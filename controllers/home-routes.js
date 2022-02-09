const router = require('express').Router();
const { ### } = require('../models/');

//get all
router.get('/', async (req, res) => {
  try {
    const #Data = await #.findAll({
      include: [
        {
          model: User,
          attributes: [
            'id',
            'username',
          ],
        },
      ],
    });
    const # = #Data.map((Post) => #.get({ plain: true }));
    res.render('all-posts', { # });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post
router.get('/#/:id', async (req, res) => {
  try {
    const #Data = await #.findOnek(req.params.id, {
      include: [
        User,
        {
          model: #,
          include: [User],
        },
      ],
    });

    if (#Data) {
      const # = #Data.get({ plain: true });
      res.render('single-post', { # });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//render the login page and redirect the user not logged in to the homepage
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// render the sign up page and redirect the user not logged in to the homepage
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;