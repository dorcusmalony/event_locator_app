const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Event = require('./event');
const User = require('./user');

const EventReview = sequelize.define('EventReview', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  event_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  review: { type: DataTypes.TEXT, allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = EventReview;