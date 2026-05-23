import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

function Checkout() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const { token } = useAuth(); // Assuming you need user info
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Logic for Shipping and Final Amount
  const shipping = totalItems > 0 && totalPrice < 500 ? 50 : 0;
  const grandTotal = totalPrice + shipping;
  const amountInPaise = Math.round(grandTotal * 100); // Razorpay requires Paise

  const paymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 2. Create Order on your Backend
      const payload = {
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        items: cart // Pass cart items to save in DB later
      };

      const response = await axios.post("http://localhost:5000/api/order/payment", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const order = response.data;

      // 3. Razorpay Options
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: amountInPaise,
        currency: "INR",
        name: "BookStore Corp",
        description: `Purchase of ${totalItems} books`,
        image: "https://your-logo-url.com/logo.png",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 4. Validate Payment on Backend
            const validateResponse = await axios.post("http://localhost:5000/api/order/payment-validate", {
              ...response,
              cart, // Send cart again to finalize the order in DB
              amount: grandTotal
            });

            if (validateResponse.data.success) {
              clearCart(); // Wipe cart after successful payment
              navigate("/orders"); // Redirect to a success page
            }
          } catch (err) {
            console.error("Validation error:", err);
            alert("Payment successful, but order recording failed. Contact support.");
          }
        },
        prefill: {
          name: "User Name", // Ideally get this from AuthContext
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: { color: "#4F46E5" } // Indigo-600 to match your UI
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Order Summary Recap */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Review Items</h2>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.title} (x{item.quantity})</span>
                  <span className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="p-6 bg-gray-50 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">Amount Payable</span>
              <span className="text-2xl font-black text-indigo-600">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-6">
            <button 
              onClick={paymentHandler}
              disabled={loading || cart.length === 0}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.98] disabled:bg-gray-300 disabled:shadow-none"
            >
              {loading ? "Processing..." : `Pay ₹${grandTotal.toFixed(2)}`}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              By clicking "Pay", you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;