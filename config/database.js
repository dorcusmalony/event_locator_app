const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('event_locator_db', 'postgres', 'mosesalier@2023', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log, // Enable logging for debugging purposes
});

module.exports = sequelize;