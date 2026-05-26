import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import AdminSidebar from "../../components/AdminSidebar";

export default function EditBook() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
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

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook =
    async () => {
      try {
        const res =
          await fetch(
            `http://localhost:5000/api/books/${id}`
          );

        const data =
          await res.json();

        setFormData(
          data.book
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  const handleChange =
    (e) => {
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

        await fetch(
          `http://localhost:5000/api/books/${id}`,
          {
            method:
              "PUT",

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

        alert(
          "Book updated successfully"
        );

        navigate(
          "/admin/books"
        );
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
          Edit Book
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="bg-white rounded-2xl shadow p-8 grid md:grid-cols-2 gap-5"
        >
          <input
            name="title"
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
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="border p-3 rounded-lg md:col-span-2 h-40"
          />

          <button className="bg-indigo-600 text-white p-4 rounded-xl md:col-span-2">
            Update Book
          </button>
        </form>
      </div>
    </div>
  );
}