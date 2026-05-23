const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const {createPayment, validatePayment} = require('../utils/paymentGateway');

router.post('/payment', createPayment);
router.post('/payment-validate',validatePayment);

module.exports = router;