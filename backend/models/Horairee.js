const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
  userId: {
    type: DataTypes.INTEGER, // Foreign key to the user (employer)
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = Horairee;
