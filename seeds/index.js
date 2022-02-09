const seedPosts = require('./projectData');
const seedUsers = require('./userData');


const sequelize = require('../config/config');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedProjects();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();