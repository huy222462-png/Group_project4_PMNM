import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Gọi API logout (server sẽ trả về success)
      await authAPI.logout();

      // Xóa token và user khỏi localStorage + context
      logout();

      // Chuyển về trang login
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn logout phía client dù API lỗi
      logout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <h1>User Management</h1>
        </div>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                Xin chào, {user?.name || user?.email || "User"}
              </span>
              <button onClick={() => navigate("/")} className="nav-button">
                Trang chủ
              </button>
              <button onClick={handleLogout} className="nav-button logout-btn">
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="nav-button">
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="nav-button signup-btn"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
