const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Human-Resources-Management-DB', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});



module.exports = sequelize;