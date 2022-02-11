const sequelize = require('../config/connection');
const seedProject = require('./project-seeds');
const seedUser = require('./user-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUser();

    await seedProject();
    process.exit(0);
};

seedAll();