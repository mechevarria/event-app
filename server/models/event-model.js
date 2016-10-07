'use strict';

module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  });

  return Event;
};
