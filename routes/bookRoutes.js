const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/book', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send('Access denied. Admins only.');
    }
    const book = await Book.create(req.body);
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/books', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).send(books);
      } catch (error) {
        res.status(500).send(error);
      }
});


module.exports = router;
