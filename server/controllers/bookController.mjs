import Book from './book.js';

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationYear, publisher, language, summary, coverImage } = req.body;
    const book = new Book({
      title,
      author,
      genre,
      publicationYear,
      publisher,
      language,
      summary,
      coverImage
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
