const db = require('../model/db');

const getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch books', error: err });
    res.json(results);
  });
};

const addBook = (req, res) => {
  const { title, author, description } = req.body;
  const userId = req.user.id;

  const query = 'INSERT INTO books (title, author, description, created_by) VALUES (?, ?, ?, ?)';
  db.query(query, [title, author, description, userId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to add book', error: err });
    res.status(201).json({ message: 'Book added successfully' });
  });
};

const updateBook = (req, res) => {
  const bookId = req.params.id;
  const { title, author, description } = req.body;

  const query = 'UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?';
  db.query(query, [title, author, description, bookId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to update book', error: err });
    res.json({ message: 'Book updated successfully' });
  });
};

const deleteBook = (req, res) => {
  const bookId = req.params.id;

  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [bookId], (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to delete book', error: err });
    res.json({ message: 'Book deleted successfully' });
  });
};

module.exports = { getBooks, addBook, updateBook, deleteBook };
