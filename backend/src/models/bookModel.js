const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  category: String,
  stock: Number,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);