import { createContext, useContext, useState, useEffect } from "react";
import API from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await API.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    };
    verifyAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await API.post("/users/signin", credentials);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      console.error("Login error:", error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
