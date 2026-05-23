const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      quantity: Number,
      price: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'pending' },
  paymentId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);