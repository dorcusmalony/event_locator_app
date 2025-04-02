const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event');
const Category = require('./Category');

const EventCategory = sequelize.define('eventCategory', {
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  primaryKey: ['event_id', 'category_id']
});

module.exports = EventCategory;