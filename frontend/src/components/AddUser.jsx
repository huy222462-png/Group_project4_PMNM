import React, { useState } from "react";
import { authAPI } from "../services/api";

const AddUser = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trống
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert("Vui lòng nhập đầy đủ họ tên, email và mật khẩu!");
      return;
    }

    setLoading(true);

    try {
      // Sử dụng authAPI.signup
      const response = await authAPI.signup(formData.name, formData.email, formData.password);
      alert(response.message || "Thêm user thành công!");
      if (onUserAdded) onUserAdded(); // cập nhật danh sách
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
      alert(err.response?.data?.message || "Không thể thêm user. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Tên người dùng"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm User"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
