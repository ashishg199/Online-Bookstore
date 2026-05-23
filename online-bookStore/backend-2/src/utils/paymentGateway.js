const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto')
require('dotenv').config();
const Order = require('../models/orderModel');



exports.createPayment = async (req, res) => {
  console.log('req::: ', req.body);
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    });

    const options = {
      amount: req.body?.amount, // amount in the smallest currency unit (e.g., paise for INR)
      currency: req.body?.currency || "INR",
      receipt: req.body?.receipt || `receipt_order_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options); 

    if (!order) {
      return res.status(500).send("Error creating order");
    }
    await Order.create({ _id: req.body?.orderId }, { paymentId: order.id });
    res.json(order);
  } catch (error) {
    console.error(error); 
    return res.status(500).send("Server error");
  }
};


exports.validatePayment = async(req, res)=>{
 
  console.log(' req.body::: ',  req.body);
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

  const sha = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
  
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)

  const digest = sha.digest('hex');
  if(digest !== razorpay_signature){
    return res.status(400).json({msg:"Transaction is Invalid!"})
  }
  res.json({
    msg:"success",
    order_id : razorpay_order_id,
    payment_id : razorpay_payment_id
  })

};
