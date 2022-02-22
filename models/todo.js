'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {}

  Todo.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    todoCode: DataTypes.STRING,
    date: DataTypes.INTEGER,
    title: DataTypes.STRING,
    contents: DataTypes.STRING,
    done: DataTypes.STRING,
    edit: DataTypes.STRING,
    delete: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};