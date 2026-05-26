const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/auth"
  );

const controller =
  require(
    "../controllers/orderController"
  );

const payment =
  require(
    "../utils/paymentGateway"
  );

router.post(
  "/",
  auth,
  controller.createOrder
);

router.get(
  "/my-orders",
  auth,
  controller.getMyOrders
);

router.post(
  "/payment",
  auth,
  payment.createPayment
);

router.post(
  "/verify-payment",
  auth,
  payment.verifyPayment
);

module.exports =
  router;