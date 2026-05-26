const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book"
        },

        title: String,
        quantity: Number,
        price: Number
      }
    ],

    totalAmount: {
      type: Number,
      required: true
    },

    shippingAddress: {
      type: String,
      required: true
    },

    paymentId: {
      type: String
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
      ],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);