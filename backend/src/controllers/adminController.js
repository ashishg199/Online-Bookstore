const User = require("../models/userModel");
const Book = require("../models/bookModel");
const Order = require("../models/orderModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalCustomers =
      await User.countDocuments({
        role: "customer"
      });

    const totalOrders =
      await Order.countDocuments();

    const revenue =
      await Order.aggregate([
        {
          $match: {
            paymentStatus: "paid"
          }
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$totalAmount"
            }
          }
        }
      ]);

    res.json({
      success: true,
      totalBooks,
      totalCustomers,
      totalOrders,
      totalRevenue:
        revenue[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getCustomers = async (
  req,
  res
) => {
  try {
    const customers =
      await User.find({
        role: "customer"
      }).select("-password");

    res.json({
      success: true,
      customers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate("userId", "name email")
        .sort({
          createdAt: -1
        });

    res.json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateOrderStatus =
  async (req, res) => {
    try {
      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            orderStatus:
              req.body.status
          },
          { new: true }
        );

      res.json({
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