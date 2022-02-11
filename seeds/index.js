const sequelize = require('../config/connection');
const seedDonation = require('./donation-seed');
const seedProject = require('./project-seeds');
const seedUser = require('./user-seeds');

const seedAll = async () => {
    try {
        await sequelize.sync({ force: true });
    } catch (err) {
        console.log("Meow");
        console.log(err);
    }
    
    await seedUser();

    await seedProject();

    await seedDonation();
    process.exit(0);
};

seedAll();