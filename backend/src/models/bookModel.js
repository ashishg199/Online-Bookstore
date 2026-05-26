const mongoose =
  require("mongoose");

const bookSchema =
  new mongoose.Schema(
    {
      bookId: {
        type: Number,
        unique: true
      },

      title: {
        type: String,
        required: true
      },

      author: {
        type: String,
        required: true
      },

      genre: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      imageUrl: {
        type: String,
        default: ""
      },

      price: {
        type: Number,
        required: true
      },

      stock: {
        type: Number,
        default: 0
      },

      isbn: {
        type: String,
        default: ""
      },

      publishedYear: {
        type: Number
      }
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.model(
    "Book",
    bookSchema
  );