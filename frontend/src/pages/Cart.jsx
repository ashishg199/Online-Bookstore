import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Cart() {
  // Use global values from Context instead of calculating locally
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  // Shipping logic (e.g., Free shipping over ₹500)
  const shipping = totalItems > 0 && totalPrice < 500 ? 50.0 : 0;
  const grandTotal = totalPrice + shipping;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center px-4">
        <div className="bg-gray-100 p-6 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 max-w-xs">
          Looks like you haven't added any books to your collection yet.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
  if (loggedIn) {
    navigate("/checkout");
  } else {
    navigate("/login");
  }
};

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-500 mt-1">
              You have{" "}
              <span className="font-bold text-indigo-600">{totalItems}</span>{" "}
              items in your cart
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Product List (Left Column) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id || item.bookId}
                className="flex flex-col sm:flex-items-center sm:flex-row bg-white p-5 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                {/* Book Thumbnail */}
                <div className="h-32 w-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
                  <img
                    src={item.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 italic">
                        By {item.author || "Unknown Author"}
                      </p>
                    </div>
                    <div className="text-right">
                      {/* Stack Price Logic: Show individual x Qty and Total for that row */}
                      <p className="text-lg font-bold text-indigo-600">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-400">
                        ₹{item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 flex justify-between items-center">
                    <div className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-lg border">
                      Qty:{" "}
                      <span className="ml-2 font-bold text-indigo-600">
                        {item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item._id || item.bookId)}
                      className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors p-2 hover:bg-red-50 rounded-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-green-600 font-bold"
                        : "font-semibold text-gray-900"
                    }
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-[10px] text-indigo-500 bg-indigo-50 p-2 rounded">
                    Add ₹{500 - totalPrice} more for FREE shipping!
                  </p>
                )}

                <div className="border-t border-gray-100 pt-4 flex justify-between items-end">
                  <span className="text-base font-bold text-gray-900">
                    Total Amount
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-indigo-600 tracking-tight">
                      ₹{grandTotal.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase">
                      Inclusive of all taxes
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-8 flex items-center justify-center w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.98]"
              >
                Proceed to Checkout
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>

              <div className="mt-6 flex flex-col items-center justify-center space-y-2 opacity-50">
                <div className="flex gap-2">
                  <div className="h-4 w-6 bg-gray-200 rounded-sm" />
                  <div className="h-4 w-6 bg-gray-200 rounded-sm" />
                  <div className="h-4 w-6 bg-gray-200 rounded-sm" />
                </div>
                <p className="text-[10px] text-gray-400 font-medium">
                  100% SECURE PAYMENT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
