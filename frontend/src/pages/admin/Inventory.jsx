import {
  useEffect,
  useState
} from "react";

import AdminSidebar from "../../components/AdminSidebar";

export default function Inventory() {
  const [books,
    setBooks] =
    useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks =
    async () => {
      const res =
        await fetch(
          "http://localhost:5000/api/books"
        );

      const data =
        await res.json();

      setBooks(
        data.books
      );
    };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Inventory
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {books.map(
            (book) => (
              <div
                key={
                  book._id
                }
                className="bg-white rounded-xl shadow p-5"
              >
                <h2 className="font-bold text-xl mb-2">
                  {
                    book.title
                  }
                </h2>

                <p>
                  Stock:
                  <span className="font-bold text-indigo-600 ml-2">
                    {
                      book.stock
                    }
                  </span>
                </p>

                <p className="mt-2">
                  Price:
                  <span className="font-bold ml-2">
                    ₹
                    {
                      book.price
                    }
                  </span>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}