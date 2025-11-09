import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching users...");
      console.log("📝 Current user:", user);
      console.log("🔑 Token:", localStorage.getItem("token"));
      
      const response = await authAPI.getAllUsers();
      console.log("📦 Response from API:", response);
      
      if (response.success) {
        console.log("✅ Users data:", response.data);
        setUsers(response.data);
      } else {
        console.warn("⚠️ Response success is false");
      }
    } catch (error) {
      console.error("❌ Fetch users error:", error);
      console.error("❌ Error response:", error.response);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to load users",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await authAPI.deleteUser(userId);

      if (response.success) {
        setMessage({ type: "success", text: "User deleted successfully" });
        fetchUsers(); // Refresh list
        
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Delete user error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to delete user",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const handleUpdateRole = async (userId) => {
    if (!newRole) {
      setMessage({ type: "error", text: "Please select a role" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await authAPI.updateUserRole(userId, newRole);

      if (response.success) {
        setMessage({ type: "success", text: response.message });
        setEditingUserId(null);
        setNewRole("");
        fetchUsers(); // Refresh list
        
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      console.error("Update role error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update role",
      });
    } finally {
      setLoading(false);
    }
  };

  // Start editing role
  const startEditRole = (userId, currentRole) => {
    setEditingUserId(userId);
    setNewRole(currentRole);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingUserId(null);
    setNewRole("");
  };

  if (loading && users.length === 0) {
    return (
      <div className="admin-panel">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h2>Admin Panel - User Management</h2>
          <p className="admin-subtitle">
            Manage all users in the system
          </p>
        </div>
        <button 
          className="reload-button" 
          onClick={fetchUsers}
          disabled={loading}
          title="Reload user list"
        >
          {loading ? "⏳ Loading..." : "🔄 Reload"}
        </button>
      </div>

      {/* Message display */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* User statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter(u => u.role === "admin").length}
          </div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter(u => u.role === "user").length}
          </div>
          <div className="stat-label">Regular Users</div>
        </div>
      </div>

      {/* Users table */}
      <div className="users-table-container">
        {users.length === 0 && !loading ? (
          <div className="no-users-message">
            <p>📭 No users found</p>
            <p className="no-users-subtitle">
              Click "Reload" button to fetch users or check your connection
            </p>
            <button className="reload-button-inline" onClick={fetchUsers}>
              🔄 Try Again
            </button>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem) => (
                <tr key={userItem._id}>
                  <td>
                    <div className="user-avatar-cell">
                      {userItem.avatar ? (
                        <img src={userItem.avatar} alt={userItem.name} />
                      ) : (
                        <div className="avatar-placeholder-small">
                          {userItem.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                  </td>
                <td className="user-name-cell">{userItem.name}</td>
                <td className="user-email-cell">{userItem.email}</td>
                <td>
                  {editingUserId === userItem._id ? (
                    <select
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`role-badge ${userItem.role}`}>
                      {userItem.role === "admin" ? "Admin" : "User"}
                    </span>
                  )}
                </td>
                <td className="user-date-cell">
                  {new Date(userItem.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <div className="action-buttons">
                    {editingUserId === userItem._id ? (
                      <>
                        <button
                          className="btn btn-save"
                          onClick={() => handleUpdateRole(userItem._id)}
                          disabled={loading}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-cancel-small"
                          onClick={cancelEdit}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-edit"
                          onClick={() => startEditRole(userItem._id, userItem.role)}
                          disabled={loading || userItem._id === user?.id}
                        >
                          Change Role
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDeleteUser(userItem._id, userItem.name)}
                          disabled={loading || userItem._id === user?.id}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}

        {users.length === 0 && !loading && (
          <div className="no-users-message">
            <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📭 No users found</p>
            <p className="no-users-subtitle" style={{ color: "#666", marginBottom: "1.5rem" }}>
              Click "Reload" button to fetch users or check your connection
            </p>
            <button className="reload-button" onClick={fetchUsers}>
              🔄 Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
