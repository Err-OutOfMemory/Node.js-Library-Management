const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ISBN: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  availableCopies: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  timestamps: false 
});

module.exports = Book;
