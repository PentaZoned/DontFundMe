const sequelize = require('../config/connection');
const seedDonations = require('./donation-seeds');
const seedProjects = require('./project-seeds');
const seedUsers = require('./user-seeds');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
    } catch (err) {
        console.log("Meow");
        console.log(err);
    }
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedProjects();
    console.log('\n----- PROJECTS SEEDED -----\n');

    await seedDonations();
    console.log('\n----- DONATIONS SEEDED -----\n');

    process.exit(0);
};

seedAll();