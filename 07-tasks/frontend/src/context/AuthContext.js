import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "https://tasks-smil.onrender.com/api/auth/me"
        // { withCredentials: true }
      );
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    await axios.post(
      "https://tasks-smil.onrender.com/api/auth/login",
      { username, password }
      // { withCredentials: true }
    );
    await checkAuth();
  };

  const logout = async () => {
    await axios.post(
      "https://tasks-smil.onrender.com/api/auth/logout",
      {}
      // { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
