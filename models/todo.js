"use strict";
module.exports = function(sequelize, DataTypes) {
  var todos = sequelize.define(
    "todos",
    {
      chore: {
        type: DataTypes.STRING
      },
      completed: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return todos;
};
