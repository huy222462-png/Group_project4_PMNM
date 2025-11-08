import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Component bảo vệ route, chỉ cho phép user đã đăng nhập truy cập
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Đợi kiểm tra auth từ localStorage
  if (loading) {
    return (
      <div className="loading-container">
        <p>Đang tải...</p>
      </div>
    );
  }

  // Nếu chưa đăng nhập, chuyển về trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, hiển thị component con
  return children;
};

export default ProtectedRoute;
