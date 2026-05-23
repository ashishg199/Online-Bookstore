const Book = require('../models/bookModel');
const Order = require('../models/orderModel');

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.getBookById = async (req, res) => {
  const book = await Book.findOne({ bookId: parseInt(req.params.id) });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

exports.createBook = async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
};

exports.searchBooks = async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;

  const query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (category) query.category = category;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json(books);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId');
  res.json(orders);
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
};