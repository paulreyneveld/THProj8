'use strict';
const Sequelize = require('sequelize');

// Defines ORM model interfacing with the DB. 
module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Name is required',
        }
      },
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Author is required',
        }
      },
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER
  }, { sequelize });

  return Book;
};
