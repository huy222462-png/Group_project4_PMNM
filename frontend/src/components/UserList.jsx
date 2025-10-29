<<<<<<< HEAD
import React from "react";

const UserList = ({ users }) => {
  return (
    <div>
      <h2>Danh sách User</h2>
      <ul>
        {users.map(user => (
          <li key={user._id || user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
=======
import React, { useState } from "react";
import axios from "axios";

const UserList = ({ users, fetchUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // 🗑 Xóa user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      fetchUsers(); // tải lại danh sách
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
    }
  };

  // ✏️ Mở form sửa user
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  // 💾 Cập nhật user
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${editingUser._id || editingUser.id}`, {
        name: editName,
        email: editEmail,
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi khi cập nhật user:", err);
    }
  };

  return (
    <div>
      <h2>Danh sách User</h2>
      {users.length === 0 ? (
        <p>Chưa có user nào.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li key={user._id || user.id} style={{ marginBottom: "10px" }}>
              {editingUser &&
              (editingUser._id === user._id || editingUser.id === user.id) ? (
                <div>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Tên"
                  />
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <button onClick={handleUpdate}>💾 Lưu</button>
                  <button onClick={() => setEditingUser(null)}>❌ Hủy</button>
                </div>
              ) : (
                <div>
                  {user.name} - {user.email}{" "}
                  <button onClick={() => handleEdit(user)}>✏️ Sửa</button>
                  <button onClick={() => handleDelete(user._id || user.id)}>🗑 Xóa</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
>>>>>>> backend
    </div>
  );
};

export default UserList;
