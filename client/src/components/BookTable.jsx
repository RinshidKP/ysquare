import React, { useEffect, useState } from 'react';
import './BookTable.css'; // Import CSS for styling
import api from '../constans/urls';

const BookTableRow = ({ book }) => {
  return (
    <tr>
      <td>{book.Title}</td>
      <td>{book.Author}</td>
      <td>{book.Genre}</td>
      <td>{book.Publisher}</td>
      <td>{book.Language}</td>
    </tr>
  );
};

const BookTable = ({width}) => {
    const itemsPerPage = 10;
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await api.get('/books');
          setBooks(response.data.books);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      };
      fetchBooks();
    }, []); 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(books.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div style={{ width: '100vw' }}>
        <div className="book-table-container">
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Publisher</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book) => (
                <BookTableRow key={book._id} book={book} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
};

export default BookTable;
