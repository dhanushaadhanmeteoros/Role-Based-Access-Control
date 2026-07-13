const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../data/users'); //Loads fake users.

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;  // Creates Login API and gets values from frontend.

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },  // Creates JWT
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token }); // Returns JWT to frontend
});

module.exports = router;