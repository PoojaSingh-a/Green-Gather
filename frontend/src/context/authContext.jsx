import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail,setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added to indicate auth check is in progress

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("/api/auth/check-auth", { withCredentials: true });
        setIsLoggedIn(true);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
      } catch (error) {
        setIsLoggedIn(false);
        setUserName('');
        setUserEmail('');
      } finally {
        setIsLoading(false); // Auth check completed
      }
    };
    checkAuthStatus();
  }, []);

  const login = (name) => {
    setIsLoggedIn(true);
    setUserName(name);
    setUserEmail(email);
  };

  // Function to handle logout
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUserName('');
      console.log("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = { isLoggedIn, userName, userEmail, login, logout, isLoading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);