import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import api from '../services/api';
import { logout } from '../auth';
const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = useCallback(async () => {
    try {
      const res = await api.get('/books/getAll');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  }, []);  

  const handleAdd = async (newBook, resetForm) => {
    try {
      await api.post('/books/add', newBook);
      fetchBooks(); // Fetch books again after adding
      resetForm(); // Clear the form after adding the book
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); // Add `fetchBooks` as a dependency

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      
      <BookForm onSubmit={handleAdd} />

      <BookList books={books} />
    </div>
  );
};

export default UserDashboard;
