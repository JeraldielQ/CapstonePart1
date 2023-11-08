import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './context/appContext';
import './Favorites.css';

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  const favoritesChecker = (id) => {
    const isFavorite = favorites.some((book) => book.id === id);
    return isFavorite;
  };

  return (
    <div className='favorites'>
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <div key={book.id} className='book-entry'>
            <div>
              <h2>{book.title}</h2>
            </div>
            <Link key={book.id} to={`/book/${book.id}`} className='book-entry-link'>
              <div>
                <img src={book.image_url} alt='#' />
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
        <h1>No favorites</h1>
      )}
    </div>
  );
};

export default Favorites;
