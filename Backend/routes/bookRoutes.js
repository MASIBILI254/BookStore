const express = require('express');
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

const { verifyToken } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');

// Public for logged-in users
router.get('/getAll', verifyToken, getBooks);
router.post('/add', verifyToken, addBook);

// Admin-only routes
router.put('/:id', verifyToken, requireRole('admin'), updateBook);
router.delete('/:id', verifyToken, requireRole('admin'), deleteBook);

module.exports = router;
