const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, 'secretkey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
