import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra trống
    if (!userName.trim() || !userEmail.trim()) {
      alert("Vui lòng nhập đầy đủ họ tên và email!");
      return;
    }

    const newUser = { name: userName, email: userEmail };
    setLoading(true);

    try {
      // Gọi backend đúng port
      const res = await axios.post("http://localhost:5000/users", newUser);
      alert(res.data.message || "Thêm user thành công!");
      if (onUserAdded) onUserAdded(); // cập nhật danh sách
      setUserName("");
      setUserEmail("");
    } catch (err) {
      console.error("Lỗi khi thêm user:", err);
      alert("Không thể thêm user. Vui lòng thử lại!");
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
          placeholder="Tên người dùng"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
