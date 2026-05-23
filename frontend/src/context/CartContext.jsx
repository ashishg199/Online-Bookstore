import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage to persist data on refresh
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("bookstore_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookstore_cart", JSON.stringify(cart));
  }, [cart]);

  // Add to Cart / Increment Quantity
  const addToCart = (book) => {
    setCart((prevCart) => {
      // Check if book already exists (check both _id or bookId depending on your schema)
      const existingItem = prevCart.find((item) => item._id === book._id || item.bookId === book.bookId);

      if (existingItem) {
        return prevCart.map((item) =>
          (item._id === book._id || item.bookId === book.bookId)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If new item, add it with quantity 1
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  // Remove from Cart / Decrement Quantity
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === id || item.bookId === id);

      if (existingItem && existingItem.quantity > 1) {
        // Decrement quantity
        return prevCart.map((item) =>
          (item._id === id || item.bookId === id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      // If quantity is 1, remove the item entirely
      return prevCart.filter((item) => item._id !== id && item.bookId !== id);
    });
  };

  // Clear Cart (useful for after checkout)
  const clearCart = () => setCart([]);

  // Calculate Total Quantity for the Navbar badge
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};