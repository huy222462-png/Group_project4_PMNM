import React, { createContext, useState, useContext, useEffect } from "react";

// Tạo Context
const AuthContext = createContext(null);

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Khởi tạo: kiểm tra token trong localStorage khi app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Đăng nhập: lưu token và user vào state + localStorage
  const login = (userData, authToken) => {
    console.log("🔐 AuthContext.login called");
    console.log("👤 userData:", userData);
    console.log("🔑 authToken:", authToken);
    
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    
    console.log("✅ Saved to localStorage:", {
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token")
    });
  };

  // Đăng xuất: xóa token và user khỏi state + localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Cập nhật user info (sau khi update profile)
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
