import Book from '../model/bookSchema.mjs';
import Author from '../model/authorSchema.mjs';


export const getDashboardData = async (req, res, next) => {
    try {
        const dashboardData = await Author.aggregate([
            {
              $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: 'Author',
                as: 'books'
              }
            },
            {
              $project: {
                _id: 0,
                Name: 1,
                numBooks: { $size: '$books' }
              }
            }
          ]);

          const languageData = await Author.aggregate([
            {
              $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: 'Author',
                as: 'books'
              }
            },
            {
              $unwind: '$books' 
            },
            {
              $group: {
                _id: '$books.Language', 
                numBooks: { $sum: 1 } 
              }
            },
            {
              $project: {
                _id: 0,
                language: '$_id',
                numBooks: 1
              }
            }
          ]);
          
        console.log(languageData)
          res.json({dashboardData,languageData});
    } catch (error) {
      next(error);
    }
  };


  export const getAllBooks = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const books = await Book.find().skip(startIndex).limit(limit);
      const totalBooks = await Book.countDocuments();
  
      const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
      };
  
      res.json({ books, pagination });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
