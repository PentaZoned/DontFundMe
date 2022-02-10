const User = require('./User');
const Project = require('./Project');
const Donation = require('./Donation');

// Create associations between the models
// User-Project relationship
User.hasMany(Project, {
  foreignKey: 'user_id'
});
//Project-User relationship
Project.belongsTo(User, {
  foreignKey: 'user_id'
});

// Donation-User relationship
Donation.belongsTo(User, {
  foreignKey: 'user_id',
  // hooks:true
});

// Donation-Project relationship
Donation.belongsTo(Project, {
  foreignKey: 'project_id',
  // hooks: true
});

// User-Donation relationsihp
User.hasMany(Donation, {
  foreignKey: 'user_id',
  onDelete: 'cascade',
  // hooks:true
});

// Project-Donation relationship
Project.hasMany(Donation, {
  foreignKey: 'project_id',
  onDelete: 'cascade',
  // hooks:true
})

module.exports = { User, Project, Donation };