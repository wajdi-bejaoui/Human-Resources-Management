const Congee = require('./Congee');
const User = require('./User');

// Establishing the relationship
User.hasMany(Congee, {
  foreignKey: 'userId', // Foreign key in the Congee table
  sourceKey: 'id' // Primary key in the User table
});

Congee.belongsTo(User, {
  foreignKey: 'userId', // Foreign key in the Congee table
  targetKey: 'id' // Primary key in the User table
});