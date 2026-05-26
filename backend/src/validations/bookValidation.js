const { body } = require(
  "express-validator"
);

exports.bookValidation = [
  body("title")
    .notEmpty()
    .withMessage(
      "Title required"
    ),

  body("author")
    .notEmpty()
    .withMessage(
      "Author required"
    ),

  body("genre")
    .notEmpty()
    .withMessage(
      "Genre required"
    ),

  body("price")
    .isNumeric()
    .withMessage(
      "Price must be numeric"
    ),

  body("stock")
    .isNumeric()
    .withMessage(
      "Stock must be numeric"
    )
];