const express = require("express");

const router = express.Router();

const authController = require(
  "../controllers/authController"
);

const auth = require(
  "../middleware/auth"
);

const validate = require(
  "../middleware/validate"
);

const {
  registerValidation,
  loginValidation
} = require(
  "../validations/authValidation"
);

router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

router.get(
  "/profile",
  auth,
  authController.getProfile
);

module.exports = router;