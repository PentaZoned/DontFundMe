const { User } = require('../models');

const userData = [
    {
        name: "Emily Patterson" ,
        email: "emily@fakemail.com",
        password: "password123",
    },
    {
        name: "Jake Hamilton" ,
        email: "jake@fakemail.com",
        password: "123password",
    },
    {
        name: "Harold Park" ,
        email: "harold@fakemail.com",
        password: "123password123",
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;