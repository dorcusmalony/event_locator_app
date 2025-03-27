const { Sequelize } = require('sequelize');

// Create a Sequelize instance with PostgreSQL configuration
const sequelize = new Sequelize('event_locator_db', 'postgres', 'mosesalier@2023', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

module.exports = sequelize;