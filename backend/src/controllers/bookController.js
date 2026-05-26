const Book = require("../models/bookModel");

exports.createBook = async (req, res) => {
  try {
    const lastBook = await Book.findOne().sort({
      bookId: -1,
    });

    const nextBookId = lastBook ? lastBook.bookId + 1 : 1;

    const book = await Book.create({
      ...req.body,
      bookId: nextBookId,
    });

    res.status(201).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const { search, genre, author, page = 1, limit = 1000 } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (genre) query.genre = genre;

    if (author)
      query.author = {
        $regex: author,
        $options: "i",
      };

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({
      bookId: Number(req.params.id),
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { bookId: Number(req.params.id) },
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
