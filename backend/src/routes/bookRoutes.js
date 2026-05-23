const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
const auth = require('../middleware/auth');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post('/', auth, bookController.createBook);
router.post('/search-books', bookController.searchBooks);

module.exports = router;