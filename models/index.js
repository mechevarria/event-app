'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('sequelize', 'root', null, {
      dialect: "sqlite", // or 'sqlite', 'postgres', 'mariadb'
      storage: "/tmp/sqlite.db",
    });
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].hasOwnProperty('associate')) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
