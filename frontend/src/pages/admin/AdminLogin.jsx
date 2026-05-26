import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../../context/AuthContext";

export default function AdminLogin() {
  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email,
    setEmail] =
    useState("");

  const [
    password,
    setPassword
  ] = useState("");

  const handleLogin =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  {
                    email,
                    password
                  }
                )
            }
          );

        const data =
          await res.json();

        if (
          data.role !==
          "admin"
        ) {
          return alert(
            "Not an admin account"
          );
        }

        login(
          data.token,
          data.role,
          data.user
        );

        navigate(
          "/admin/dashboard"
        );
      } catch (err) {
        alert(
          err.message
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={
          handleLogin
        }
        className="bg-white p-8 rounded-xl shadow-md w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-5">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target
                .value
            )
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={
            password
          }
          onChange={(e) =>
            setPassword(
              e.target
                .value
            )
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button className="w-full bg-indigo-600 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}