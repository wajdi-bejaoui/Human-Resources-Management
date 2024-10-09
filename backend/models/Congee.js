const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');



const Congee = sequelize.define('Congee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  debut: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  typeCongee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nbJour: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: { // Add userId field
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // This should match the name of the User table
      key: 'id'
    }
  }
}, {
  timestamps: false,
  
});





module.exports = Congee;