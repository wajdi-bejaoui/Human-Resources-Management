const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');


const Horairee = sequelize.define('Horaire', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY, // Date of the working day
    allowNull: false,
  },
  startTime: {
    type: DataTypes.TIME, // Start time of the working day
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME, // End time of the working day
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'rejected'), // Status of the working time
    defaultValue: 'pending',
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
  tableName: 'horaires', // Explicitly define the table name

  timestamps: false,
});

module.exports = Horairee;
