import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUsers(response.data.users || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách user:", err);
      setError(err.response?.data?.message || "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="user-list-container">
        <h2>📋 Danh sách Người dùng</h2>
        <p className="loading-text">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <h2>📋 Danh sách Người dùng</h2>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <h2>📋 Danh sách Người dùng</h2>
      
      {!users || users.length === 0 ? (
        <p className="empty-text">Chưa có người dùng nào trong hệ thống.</p>
      ) : (
        <div className="user-table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-name">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                      ) : (
                        <div className="user-avatar-placeholder">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                    </span>
                  </td>
                  <td>
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <p className="total-users">Tổng số: {users.length} người dùng</p>
    </div>
  );
};

export default UserList;
