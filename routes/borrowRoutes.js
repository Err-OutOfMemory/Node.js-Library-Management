const express = require('express');
const BorrowRecord = require('../models/BorrowRecord');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const router = express.Router();

// Borrow a book
router.post('/borrow', auth, async (req, res) => {
  try {
    const book = await Book.findByPk(req.body.bookId);
    if (book.availableCopies < 1) return res.status(400).send('No copies available');

    const borrowRecord = await BorrowRecord.create({
      userId: req.user.id,
      bookId: req.body.bookId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  // Due in 7 days
    });

    book.availableCopies -= 1;
    await book.save();
    res.status(201).send(borrowRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Return a book
router.post('/return', auth, async (req, res) => {
  try {
    const borrowRecord = await BorrowRecord.findOne({
      where: {
        id : req.body.id,
        userId: req.user.id,
        returnDate: null
      }
    });
    
    if (!borrowRecord) return res.status(400).send('No active borrow record found');

    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    const book = await Book.findByPk(borrowRecord.bookId);
    book.availableCopies += 1;
    await book.save();
    
    res.status(200).send(borrowRecord);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
