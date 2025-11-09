import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import UploadAvatar from "./UploadAvatar";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [showAvatarModal, setShowAvatarModal] = useState(false);

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

  const handleAvatarUploadSuccess = () => {
    setShowAvatarModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand" onClick={() => navigate("/")}>
            <h1>User Management</h1>
          </div>

          <div className="navbar-menu">
            {isAuthenticated ? (
              <>
                {/* User Avatar */}
                <div className="navbar-avatar-section">
                  <div className="navbar-avatar-wrapper" onClick={() => setShowAvatarModal(true)}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="navbar-avatar" />
                    ) : (
                      <div className="navbar-avatar-placeholder">
                        {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div className="avatar-edit-overlay">
                      <span>✏️</span>
                    </div>
                  </div>
                </div>

                <span className="navbar-user">
                  {user?.name || user?.email || "User"}
                  {user?.role === "admin" && (
                    <span className="admin-badge"> (Admin)</span>
                  )}
                </span>
                <button onClick={() => navigate("/")} className="nav-button">
                  Trang chủ
                </button>
                <button onClick={() => navigate("/profile")} className="nav-button">
                  Profile
                </button>
                {user?.role === "admin" && (
                  <button onClick={() => navigate("/admin")} className="nav-button admin-btn">
                    Admin Panel
                  </button>
                )}
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

      {/* Avatar Upload Modal */}
      {showAvatarModal && (
        <div className="avatar-modal-overlay" onClick={() => setShowAvatarModal(false)}>
          <div className="avatar-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="avatar-modal-header">
              <h3>Cập nhật Avatar</h3>
              <button className="modal-close-btn" onClick={() => setShowAvatarModal(false)}>
                ✕
              </button>
            </div>
            <UploadAvatar onUploadSuccess={handleAvatarUploadSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
