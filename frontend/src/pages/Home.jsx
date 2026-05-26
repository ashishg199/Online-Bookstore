import { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBooks(searchTerm);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const fetchBooks = async (search = "") => {
    try {
      setLoading(true);

      const data = await fetchData(`/api/books?search=${search}`);

      setBooks(data.books || []);

      setLoading(false);
    } catch (error) {
      console.error(error);

      setBooks([]);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <header className="bg-indigo-50 py-16 mb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Discover Your Next{" "}
            <span className="text-indigo-600">Great Read</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of bestsellers, tech guides, and
            timeless classics.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
          <span className="text-sm text-gray-500 font-medium">
            {books.length} Books Found
          </span>
          {/* Search Box */}
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Search Icon (Right Side) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {loading ? (
          /* Simple Skeleton Loader */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 h-80 rounded-xl"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {books.map((b) => (
              <Link
                key={b._id}
                to={`/books/${b.bookId}`}
                className="group flex flex-col"
              >
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <img
                    src={
                      b.imageUrl ||
                      "https://via.placeholder.com/300x400?text=No+Cover"
                    }
                    alt={b.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Subtle Overlay on Hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>

                {/* Book Details */}
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 mb-2">
                  {b.author || "Author Name"}
                </p>
                <div className="mt-auto">
                  <span className="text-base font-bold text-gray-900">
                    ₹{b.price ? b.price.toFixed(2) : "200.00"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
