const router = require('express').Router();
// User Routes
const userRoutes = require('./user-routes');
// Post Routes
const projectRoutes = require('./project-routes');
// Comment Routes
const donationRoutes = require('./donation-routes');

// Define route path for the API to use, e.g. api/users/
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/donations', donationRoutes);

module.exports = router;