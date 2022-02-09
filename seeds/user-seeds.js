const { User } = require('../models');

const userData = [
  {
    name: "Baofeng Guo",
    email: "BG@email.com",
    password: "password12345",
  },
  {
    name: "Atlassian",
    email: "atlassian@email.com",
    password: "password123456",
  },
  {
    name: "Thomas",
    email: "Thomas@email.com",
    password: "password1234567",
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;