const { Project } = require('../models');

const projectData = [
    {
        user_id: 1,
        title: "My Dog's Vet Bills",
        description: "The vet bills for my dog are expensive, so any amount will help!",
        fund_needed: 400,
    },
    {
        user_id: 2,
        title: "New Desk",
        description: "I don't earn enough to buy a new desk. I use a plastic table from Walmart.",
        fund_needed: 200,
    },
    {
        user_id: 3,
        title: "New Work Shoes",
        description: "A friend of mine has old work shoes that are warn out. They're a sweet person, so I believe they deserve an upgrade!",
        fund_needed: 60,
    },
];

const seedProjects = () => Project.bulkCreate(projectData);

module.exports = seedProjects;