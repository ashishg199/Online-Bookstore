const express =
  require("express");

const router =
  express.Router();

const controller =
  require(
    "../controllers/bookController"
  );

const auth =
  require(
    "../middleware/auth"
  );

const adminAuth =
  require(
    "../middleware/adminAuth"
  );

const validate =
  require(
    "../middleware/validate"
  );

const {
  bookValidation
} = require(
  "../validations/bookValidation"
);

router.get(
  "/",
  controller.getBooks
);

router.get(
  "/:id",
  controller.getBookById
);

router.post(
  "/",
  auth,
  adminAuth,
  bookValidation,
  validate,
  controller.createBook
);

router.put(
  "/:id",
  auth,
  adminAuth,
  controller.updateBook
);

router.delete(
  "/:id",
  auth,
  adminAuth,
  controller.deleteBook
);

module.exports =
  router;