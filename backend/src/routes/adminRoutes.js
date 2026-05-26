const express =
  require("express");

const router =
  express.Router();

const auth =
  require(
    "../middleware/auth"
  );

const adminAuth =
  require(
    "../middleware/adminAuth"
  );

const controller =
  require(
    "../controllers/adminController"
  );

router.get(
  "/dashboard",
  auth,
  adminAuth,
  controller.getDashboardStats
);

router.get(
  "/customers",
  auth,
  adminAuth,
  controller.getCustomers
);

router.get(
  "/orders",
  auth,
  adminAuth,
  controller.getOrders
);

router.put(
  "/orders/:id",
  auth,
  adminAuth,
  controller.updateOrderStatus
);

module.exports =
  router;