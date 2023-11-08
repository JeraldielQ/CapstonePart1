import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const books_url = 'https://example-data.draftbit.com/books?_limit=240';

const BookDetails = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(books_url)
      .then((res) => {
        const foundBook = res.data.find(book => book.id === parseInt(id));

        if (foundBook) {
          setBook(foundBook);
        } else {
          console.log('Book not found');
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className='book-details'>
      <div>
        <h2>{book?.title}</h2>
        <img src={book?.image_url} alt='#' />
      </div>
      <div>
        <h2>Description</h2>
        <p>{book?.description}</p>
        <h2>Authors</h2>
        <p>{book?.authors}</p>
        <h2>Genres</h2>
        <p>{book?.genres}</p>
      </div>
    </div>
  );
};

export default BookDetails;
