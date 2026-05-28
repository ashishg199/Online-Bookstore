import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AddBook() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    imageUrl: "",
    price: "",
    stock: "",
    isbn: "",
    publishedYear: "",
  });

  // Track field-specific errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear the individual field error as the user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  // Validation Logic
  const validateForm = () => {
    let tempErrors = {};

    if (!formData.title.trim()) tempErrors.title = "Title is required";
    if (!formData.author.trim()) tempErrors.author = "Author is required";
    if (!formData.genre.trim()) tempErrors.genre = "Genre is required";

    if (!formData.price.trim()) {
      tempErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) < 0) {
      tempErrors.price = "Price must be a valid number";
    }

    if (!formData.stock.trim()) {
      tempErrors.stock = "Stock is required";
    } else if (
      isNaN(formData.stock) ||
      !Number.isInteger(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      tempErrors.stock = "Stock must be a whole number";
    }

    setErrors(tempErrors);

    // Form is valid if the tempErrors object has no keys
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation and stop submission if invalid
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Book added successfully");
        setFormData({
          title: "",
          author: "",
          genre: "",
          description: "",
          imageUrl: "",
          price: "",
          stock: "",
          isbn: "",
          publishedYear: "",
        });
        setErrors({}); // Clear any residual errors
      } else {
        // Handle backend-passed errors if your validation middleware returns any
        alert(data.message || "Failed to add book");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">Add Book</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md grid md:grid-cols-2 gap-5"
        >
          {/* Title */}
          <div className="flex flex-col gap-1">
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className={`border p-3 rounded-lg ${errors.title ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {errors.title && (
              <span className="text-red-500 text-sm pl-1">{errors.title}</span>
            )}
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1">
            <input
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className={`border p-3 rounded-lg ${errors.author ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {errors.author && (
              <span className="text-red-500 text-sm pl-1">{errors.author}</span>
            )}
          </div>

          {/* Genre */}
          <div className="flex flex-col gap-1">
            <input
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleChange}
              className={`border p-3 rounded-lg ${errors.genre ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {errors.genre && (
              <span className="text-red-500 text-sm pl-1">{errors.genre}</span>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className={`border p-3 rounded-lg ${errors.price ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {errors.price && (
              <span className="text-red-500 text-sm pl-1">{errors.price}</span>
            )}
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1">
            <input
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              className={`border p-3 rounded-lg ${errors.stock ? "border-red-500 bg-red-50" : "border-gray-300"}`}
            />
            {errors.stock && (
              <span className="text-red-500 text-sm pl-1">{errors.stock}</span>
            )}
          </div>

          {/* ISBN */}
          <div className="flex flex-col gap-1">
            <input
              name="isbn"
              placeholder="ISBN"
              value={formData.isbn}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </div>

          {/* Published Year */}
          <div className="flex flex-col gap-1">
            <input
              name="publishedYear"
              placeholder="Published Year"
              value={formData.publishedYear}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <input
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-lg h-32"
            />
          </div>

          <button className="bg-indigo-600 text-white p-4 rounded-xl md:col-span-2 hover:bg-indigo-700 transition">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
