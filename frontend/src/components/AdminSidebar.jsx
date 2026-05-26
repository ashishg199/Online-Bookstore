import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm min-h-screen hidden md:block">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">
          Admin Panel
        </h1>
      </div>

      <nav className="flex flex-col p-4 gap-2">
        <Link
          to="/admin/dashboard"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/admin/add-book"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Add Book
        </Link>

        <Link
          to="/admin/books"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Manage Books
        </Link>

        <Link
          to="/admin/orders"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Orders
        </Link>

        <Link
          to="/admin/customers"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Customers
        </Link>

        <Link
          to="/admin/inventory"
          className="px-4 py-3 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 font-medium"
        >
          Inventory
        </Link>
      </nav>
    </aside>
  );
}