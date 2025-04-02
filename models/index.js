'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    if (model && typeof model === 'function' && (!model.prototype || !model.prototype.constructor)) {
      // If it's a factory function
      db[model.name] = model(sequelize, Sequelize.DataTypes);
      console.log(`Loaded model: ${model.name}`); // Add logging
    } else if (model && typeof model === 'function') {
      // If it's a class
      db[model.name] = new model(sequelize, Sequelize.DataTypes);
      console.log(`Loaded model: ${model.name}`); // Add logging
    } else {
      console.error(`Invalid or undefined model definition in file: ${file}`);
    }
  });

Object.keys(db).forEach(modelName => {
  console.log(`Associating model: ${modelName}`); // Add logging
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;