import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://example-data.draftbit.com/books?_limit=240';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      let response;

      if (query.trim() === '') {
        // If the query is empty, fetch all books
        response = await axios.get(API);
      } else {
        // If there's a query, perform a search
        response = await axios.get(`${API}&q=${encodeURIComponent(query)}`);
      }

      onSearch(response.data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
