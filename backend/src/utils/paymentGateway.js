const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/orderModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.createPayment = async (
  req,
  res
) => {
  try {
    const {
      amount,
      items,
      shippingAddress
    } = req.body;

    const options = {
      amount: Number(amount),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder =
      await razorpay.orders.create(
        options
      );

    const order =
      await Order.create({
        userId: req.user.id,

        items,

        totalAmount:
          amount / 100,

        shippingAddress,

        paymentId:
          razorpayOrder.id,

        paymentStatus:
          "pending",

        orderStatus:
          "pending"
      });

    res.status(200).json({
      success: true,

      razorpayOrder,

      orderId: order._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};

exports.verifyPayment =
  async (req, res) => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderId
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_SECRET
          )
          .update(
            `${razorpay_order_id}|${razorpay_payment_id}`
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res
          .status(400)
          .json({
            success:
              false,
            message:
              "Payment verification failed"
          });
      }

      const order =
        await Order.findByIdAndUpdate(
          orderId,
          {
            paymentStatus:
              "paid",

            orderStatus:
              "processing",

            paymentId:
              razorpay_payment_id
          },
          { new: true }
        );

      res.json({
        success: true,
        message:
          "Payment successful",
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