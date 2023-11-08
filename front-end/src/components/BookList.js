// BookList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';
import { useAppContext } from './context/appContext';
import SearchBar from './SearchBar'; 

const API = 'https://example-data.draftbit.com/books?_limit=240';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  console.log('favorites are', favorites);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const favoritesChecker = (id) => {
    const boolean = favorites.some((book) => book.id === id);
    return boolean;
  };

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      {/* Include the SearchBar component */}
      <SearchBar onSearch={handleSearch} />

      <div className="book-list">
        {searchResults.length > 0 ? (
          // Display search results if available
          searchResults.map((book) => (
            <div key={book.id} className="book-entry">
              <div>
                <h2>{book.title}</h2>
              </div>
              <Link to={`/book/${book.id}`} className="book-entry-link">
                <div>
                  <img src={book.image_url} alt="#" />
                </div>
              </Link>
              <div>
                {favoritesChecker(book.id) ? (
                  <button onClick={() => removeFromFavorites(book.id)}>
                    Remove from Favorites
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(book)}>
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          // Display all books if no search results
          books.map((book) => (
            <div key={book.id} className="book-entry">
              <div>
                <h2>{book.title}</h2>
              </div>
              <Link to={`/book/${book.id}`} className="book-entry-link">
                <div>
                  <img src={book.image_url} alt="#" />
                </div>
              </Link>
              <div>
                {favoritesChecker(book.id) ? (
                  <button onClick={() => removeFromFavorites(book.id)}>
                    Remove from Favorites
                  </button>
                ) : (
                  <button onClick={() => addToFavorites(book)}>
                    Add to Favorites
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookList;
