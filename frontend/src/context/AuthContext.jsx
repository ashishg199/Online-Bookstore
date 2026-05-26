import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
  createContext();

export const useAuth =
  () =>
    useContext(
      AuthContext
    );

export const AuthProvider =
  ({ children }) => {
    const [token, setToken] =
      useState(
        localStorage.getItem(
          "token"
        )
      );

    const [role, setRole] =
      useState(
        localStorage.getItem(
          "role"
        ) ||
          "customer"
      );

    const [user, setUser] =
      useState(
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        ) || null
      );

    const [
      loggedIn,
      setLoggedIn
    ] = useState(
      !!localStorage.getItem(
        "token"
      )
    );

    const login = (
      token,
      role,
      user
    ) => {
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          user
        )
      );

      setToken(token);
      setRole(role);
      setUser(user);
      setLoggedIn(true);
    };

    const logout =
      () => {
        localStorage.clear();

        setToken(null);
        setRole(
          "customer"
        );
        setUser(null);
        setLoggedIn(false);
      };

    const isAdmin =
      role === "admin";

    return (
      <AuthContext.Provider
        value={{
          token,
          role,
          user,
          loggedIn,
          isAdmin,
          login,
          logout
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };