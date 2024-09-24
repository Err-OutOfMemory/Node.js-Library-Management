const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const BorrowRecord = sequelize.define('BorrowRecord', {
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false 
});

// Relationships
User.hasMany(BorrowRecord, {
  foreignKey: 'userId', 
});
BorrowRecord.belongsTo(User, {
  foreignKey: 'userId',  
});

Book.hasMany(BorrowRecord, {
  foreignKey: 'bookId', 
});
BorrowRecord.belongsTo(Book, {
  foreignKey: 'bookId',  
});


module.exports = BorrowRecord;
