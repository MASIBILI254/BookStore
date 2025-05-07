import React from 'react';
import './BookList.css';  // Import external CSS file

const BookList = ({ books, isAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="book-list-container">
      <h3 className="book-list-title">All Books</h3>
      {books.length === 0 ? (
        <p className="no-books-message">No books available.</p>
      ) : (
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id} className="book-item">
              <div className="book-details">
                <strong className="book-title">Title:{book.title}</strong> By: {book.author} <br /> Desc:{book.description && <p className="book-description">{book.description}</p>}
              </div>
              {isAdmin && (
                <div className="admin-actions">
                  <button className="edit-button" onClick={() => onEdit(book)}>Edit</button>
                  <button className="delete-button" onClick={() => onDelete(book.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
