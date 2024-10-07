const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


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
  }
}, {
  timestamps: false,
  
});





module.exports = Congee;