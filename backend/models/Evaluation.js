const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
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
}, {
  timestamps: false,
});

module.exports = Evaluation;
