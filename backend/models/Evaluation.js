const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('../models/User');

const Evaluation = sequelize.define('Evaluation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  periodRated: {
    type: DataTypes.STRING, // e.g., "Q1 2024", "Year 2023"
    allowNull: false,
  },
  evaluationDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
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
  tableName: 'evaluations', // Explicitly define the table name
  timestamps: false,
});

module.exports = Evaluation;
