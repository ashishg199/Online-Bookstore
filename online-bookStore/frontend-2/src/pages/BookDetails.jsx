import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchData } from "../services/api";
import { useCart } from "../context/CartContext";

export default function BookDetails() {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useCart(); // Assuming your context has these
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync quantity with what's already in the cart
  const cartItem = cart.find((item) => item.bookId === parseInt(id) || item._id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    setLoading(true);
    fetchData(`/api/books/${id}`)
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!book) return <div className="text-center py-20 font-bold">Book not found</div>;

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Book Cover */}
          <div className="bg-gray-50 rounded-3xl p-8 flex justify-center shadow-inner border border-gray-100">
            <img
              src={book.imageUrl || "https://via.placeholder.com/400x600?text=No+Cover"}
              alt={book.title}
              className="rounded-lg shadow-2xl w-full max-w-sm object-cover"
            />
          </div>

          {/* Right: Book Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-xl text-indigo-600 font-medium mb-6">By {book.author}</p>
            
            <div className="flex items-center justify-between mb-8">
              <p className="text-3xl font-bold text-gray-900">₹{book.price?.toFixed(2)}</p>
              <div className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-lg">In Stock</div>
            </div>

            {/* Dynamic Add to Cart / Quantity Button */}
            <div className="relative">
              {quantity === 0 ? (
                // Initial State: Big "Add to Cart" Button
                <button
                  onClick={() => addToCart(book)}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Add to Cart
                </button>
              ) : (
                // Active State: Quantity Selector Button
                <div className="w-full flex items-center justify-between bg-green-600 text-white rounded-xl shadow-xl overflow-hidden h-[60px]">
                  {/* Minus Button */}
                  <button
                    onClick={() => removeFromCart(book.bookId || book._id)}
                    className="h-full px-6 hover:bg-indigo-700 transition-colors flex items-center justify-center border-r border-indigo-500/50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>

                  {/* Quantity Display */}
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-bold">{quantity}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-80">In Cart</span>
                  </div>

                  {/* Plus Button */}
                  <button
                    onClick={() => addToCart(book)}
                    className="h-full px-6 hover:bg-indigo-700 transition-colors flex items-center justify-center border-l border-indigo-500/50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-center text-xs text-gray-400 mt-6 font-medium">
              Free delivery on eligible orders • 7 Day Replacement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}