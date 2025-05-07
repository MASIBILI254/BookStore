import React, { useEffect, useState } from 'react';
import api from '../services/api';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import { logout } from '../auth';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';  // Import external CSS file

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books/getAll');
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    }
  };

  const handleAdd = async (book) => {
    try {
      await api.post('/books/add', book);
      fetchBooks();
    } catch (err) {
      console.error('Failed to add book:', err);
    }
  };

  const handleEdit = async (book) => {
    try {
      await api.put(`/books/${book.id}`, book);
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error('Failed to edit book:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await api.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error('Failed to delete book:', err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      
      <BookForm 
        onSubmit={editingBook ? handleEdit : handleAdd}
        initialData={editingBook}
        isEditing={!!editingBook}
        cancelEdit={() => setEditingBook(null)}
      />
      
      <BookList 
        books={books}
        isAdmin={true}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminDashboard;
