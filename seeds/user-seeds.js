const { User } = require('../models');

const userData = [
    {
        id: 1,
        name: "Emily Patterson" ,
        email: "emily@fakemail.com",
        password: "password123",
    },
    {
        id: 2,
        name: "Jake Hamilton" ,
        email: "jake@fakemail.com",
        password: "123password",
    },
    {
        id: 3,
        name: "Harold Park" ,
        email: "harold@fakemail.com",
        password: "123password123",
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;