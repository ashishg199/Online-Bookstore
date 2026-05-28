import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const {
  loggedIn,
  isAdmin,
  logout
} = useAuth();
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            <span className="text-indigo-600">BOOK</span>
            <span className="text-gray-900">STORE</span>
          </Link>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600 font-medium transition"
            >
              Home
            </Link>

            {loggedIn && !isAdmin && (
              <Link
                to="/my-orders"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                My Orders
              </Link>
            )}

            {loggedIn && isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Dashboard
                </Link>

                {/* <Link
                  to="/admin"
                  className="text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Admin
                </Link>

                <Link
                  to="/orders"
                  className="text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Orders
                </Link> */}
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-300" />

            {/* Auth */}
            {loggedIn ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-red-50 hover:text-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}