const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  location: {
    type: DataTypes.GEOGRAPHY,
  },
  date: {
    type: DataTypes.DATE,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

module.exports = Event;