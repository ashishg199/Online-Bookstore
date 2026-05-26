const Order = require(
  "../models/orderModel"
);

exports.createOrder =
  async (req, res) => {
    try {
      const order =
        await Order.create({
          userId:
            req.user.id,
          ...req.body
        });

      res.status(201).json({
        success: true,
        order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };

exports.getMyOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find({
          userId:
            req.user.id
        }).sort({
          createdAt: -1
        });

      res.json({
        success: true,
        orders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message
      });
    }
  };