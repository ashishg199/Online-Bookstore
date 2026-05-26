import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../services/api";
import { useCart } from "../context/CartContext";

export default function BookDetails() {
  const { id } = useParams();

  const { cart, addToCart, removeFromCart } = useCart();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  // MongoDB string _id
  const cartItem = cart.find(
  (item) =>
    String(
      item.bookId
    ) === String(id) ||
    String(item._id) ===
      String(id)
);

  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);

      const data = await fetchData(`/api/books/${id}`);

      // backend returns { success, book }
      setBook(data.book);
    } catch (error) {
      console.error(error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-20 font-bold text-2xl">Book not found</div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <div className="bg-gray-50 rounded-3xl p-8 flex justify-center shadow-inner border border-gray-100">
            <img
              src={
                book.imageUrl ||
                "https://via.placeholder.com/400x600?text=No+Cover"
              }
              alt={book.title}
              className="rounded-lg shadow-2xl w-full max-w-sm object-cover"
            />
          </div>

          {/* Book Details */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {book.title}
            </h1>

            <p className="text-xl text-indigo-600 font-medium mb-6">
              By {book.author}
            </p>

            <div className="flex items-center justify-between mb-8">
              <p className="text-3xl font-bold text-gray-900">
                ₹{book.price?.toFixed(2)}
              </p>

              <div className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-lg">
                In Stock
              </div>
            </div>

            {/* Cart Button */}
            <div className="relative">
              {quantity === 0 ? (
                // Initial State → Add to Cart
                <button
                  onClick={() => addToCart(book)}
                  className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  Add to Cart
                </button>
              ) : (
                // Active State → Quantity Selector
                <div className="w-full flex items-center justify-between bg-green-600 text-white rounded-xl shadow-xl overflow-hidden h-[60px] transition-all">
                  {/* Minus */}
                  <button
                    onClick={() => removeFromCart(book.bookId || book._id)}
                    className="h-full px-8 hover:bg-green-700 transition-colors flex items-center justify-center border-r border-green-500/50 text-2xl font-bold"
                  >
                    −
                  </button>

                  {/* Quantity */}
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold">{quantity}</span>

                    <span className="text-[10px] uppercase tracking-widest opacity-90">
                      In Cart
                    </span>
                  </div>

                  {/* Plus */}
                  <button
                    onClick={() => addToCart(book)}
                    className="h-full px-8 hover:bg-green-700 transition-colors flex items-center justify-center border-l border-green-500/50 text-2xl font-bold"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
