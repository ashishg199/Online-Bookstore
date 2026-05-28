import { useEffect, useState } from "react";

import AdminSidebar from "../../components/AdminSidebar";
import { Link } from "react-router-dom";

export default function ManageBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const res = await fetch("http://localhost:5000/api/books");

    const data = await res.json();

    setBooks(data.books);
  };

  const deleteBook = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Delete book?")) return;

    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBooks();
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Manage Books</h1>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Author</th>

                <th className="p-4 text-left">Price</th>

                <th className="p-4 text-left">Stock</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b">
                  <td className="p-4">{book.title}</td>

                  <td className="p-4">{book.author}</td>

                  <td className="p-4">₹{book.price}</td>

                  <td className="p-4">{book.stock}</td>

                  <td className="p-4 flex gap-3">
                    <Link
                      to={`/admin/edit-book/${book.bookId}`}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteBook(book.bookId)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
