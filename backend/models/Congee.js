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
  status : {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  typeCongee: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nbJour: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  file: {
    type: DataTypes.STRING,  // Store the file path or URL as a string
    allowNull: true          // You can make it nullable if the file is optional
  },
  userId: { // Add userId field
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // This should match the name of the User table
      key: 'id'
    }
  }
},{
  tableName: 'congees', // Explicitly define the table name
  timestamps: false,
});





module.exports = Congee;