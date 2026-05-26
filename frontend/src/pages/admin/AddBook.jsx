import { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

export default function AddBook() {
  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      genre: "",
      description: "",
      imageUrl: "",
      price: "",
      stock: "",
      isbn: "",
      publishedYear: ""
    });

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(
            "http://localhost:5000/api/books",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization: `Bearer ${token}`
              },

              body:
                JSON.stringify(
                  formData
                )
            }
          );

        const data =
          await response.json();

        if (
          data.success
        ) {
          alert(
            "Book added successfully"
          );

          setFormData({
            title: "",
            author: "",
            genre: "",
            description:
              "",
            imageUrl:
              "",
            price: "",
            stock: "",
            isbn: "",
            publishedYear:
              ""
          });
        }
      } catch (error) {
        console.error(
          error
        );
      }
    };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8">
          Add Book
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white p-8 rounded-2xl shadow-md grid md:grid-cols-2 gap-5"
        >
          <input
            name="title"
            placeholder="Title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="author"
            placeholder="Author"
            value={
              formData.author
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="genre"
            placeholder="Genre"
            value={
              formData.genre
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="price"
            placeholder="Price"
            value={
              formData.price
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={
              formData.stock
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="isbn"
            placeholder="ISBN"
            value={
              formData.isbn
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="publishedYear"
            placeholder="Published Year"
            value={
              formData.publishedYear
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg"
          />

          <input
            name="imageUrl"
            placeholder="Image URL"
            value={
              formData.imageUrl
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg md:col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg md:col-span-2 h-32"
          />

          <button className="bg-indigo-600 text-white p-4 rounded-xl md:col-span-2">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}