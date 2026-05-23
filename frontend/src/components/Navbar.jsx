import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { token, logout, isAdmin } = useAuth();
  const { cart, totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">
              BOOK<span className="text-gray-900">STORE</span>
            </Link>
          </div>

          {/* Navigation Links */}
          {isAdmin &&  <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/orders" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Orders
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Admin
            </Link>
          </div>}
         

          {/* Right Side: Cart & Auth */}
          <div className="flex items-center space-x-5">
            <Link to="/cart" className="group relative p-2 transition-all">
              <span className="text-gray-600 group-hover:text-indigo-600">
                {/* Shopping Cart Icon (Heroicons style) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-indigo-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-200" />

            {token ? (
              <button
                onClick={logout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all"
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