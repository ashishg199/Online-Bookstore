import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import { AuthProvider } from "./context/AuthContext";

import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import BookDetails from "./pages/BookDetails";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import AddBook from "./pages/admin/AddBook";
import ManageBooks from "./pages/admin/ManageBooks";
import Orders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";
import Inventory from "./pages/admin/Inventory";
import EditBook from "./pages/admin/EditBook";
import MyOrders from "./pages/MyOrders";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route
  path="/my-orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>
            <Route
  path="/admin/edit-book/:id"
  element={
    <ProtectedRoute adminOnly>
      <EditBook />
    </ProtectedRoute>
  }
/>
            <Route
              path="/admin/add-book"
              element={
                <ProtectedRoute adminOnly>
                  <AddBook />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/books"
              element={
                <ProtectedRoute adminOnly>
                  <ManageBooks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute adminOnly>
                  <Orders />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/customers"
              element={
                <ProtectedRoute adminOnly>
                  <Customers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/inventory"
              element={
                <ProtectedRoute adminOnly>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/cart" element={<Cart />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route path="/books/:id" element={<BookDetails />} />

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute adminOnly>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
