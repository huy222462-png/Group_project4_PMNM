import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Component bảo vệ route, chỉ cho phép user đã đăng nhập truy cập
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, user } = useAuth();

  console.log("🛡️ ProtectedRoute check:", {
    isAuthenticated,
    loading,
    user,
    adminOnly,
    userRole: user?.role
  });

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
    console.warn("⚠️ Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // Nếu route yêu cầu admin nhưng user không phải admin
  if (adminOnly && user?.role !== "admin") {
    console.warn("⚠️ Access denied - not admin. User role:", user?.role);
    return (
      <div className="access-denied-container">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <p>Only administrators can view this content.</p>
        <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
          Your role: {user?.role || "undefined"}
        </p>
      </div>
    );
  }

  console.log("✅ Access granted");
  // Nếu đã đăng nhập (và có quyền nếu cần), hiển thị component con
  return children;
};

export default ProtectedRoute;
