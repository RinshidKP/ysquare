import Author from '../model/authorSchema.mjs';

export const addAuthor = async (req, res) => {
  try {
    const { name, nationality, birthYear, biography } = req.body;
    const author = new Author({
      name,
      nationality,
      birthYear,
      biography
    });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    await author.remove();
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
