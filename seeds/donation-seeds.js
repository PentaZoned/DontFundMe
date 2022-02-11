const { Donation } = require('../models');

const donationData = [
    {
        user_id: 2,
        project_id: 1,
        amount: 20,
    },
    {
        user_id: 3,
        project_id: 2,
        amount: 40,
    },
    {
        user_id: 1,
        project_id: 3,
        amount: 30,
    },
];

const seedDonations = () => Donation.bulkCreate(donationData);

module.exports = seedDonations;