const db = require('../model/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
  db.query(query, [username, hashedPassword, role || 'user'], (err, result) => {
    if (err) return res.status(500).json({ message: 'Registration failed', error: err });
    res.status(201).json({ message: 'User registered successfully' });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Login failed', error: err });

    const user = results[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, username: user.username });
  });
};

module.exports = { register, login };
