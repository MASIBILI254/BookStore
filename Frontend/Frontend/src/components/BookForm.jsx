import React, { useState, useEffect } from 'react';
import './BookForm.css';  // Import external CSS file

const BookForm = ({ onSubmit, initialData = null, isEditing = false, cancelEdit }) => {
  const [book, setBook] = useState({ title: '', author: '', description: '' });

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    } else {
      setBook({ title: '', author: '', description: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(book, resetForm);  // Pass resetForm to onSubmit
  };

  const resetForm = () => {
    setBook({ title: '', author: '', description: '' }); // Reset the form fields
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <input
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        required
        className="input-field"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={book.description}
        onChange={handleChange}
        className="input-field textarea"
      />
      <div className="button-container">
        <button type="submit" className="submit-button">
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
        {isEditing && (
          <button type="button" onClick={cancelEdit} className="cancel-button">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;
