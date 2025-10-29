import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Lỗi khi tải users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Quản lý User</h1>
      {/* ✅ Truyền hàm fetchUsers xuống AddUser để thêm user xong thì reload danh sách */}
      <AddUser onUserAdded={fetchUsers} />

      {/* ✅ Truyền cả users và fetchUsers xuống UserList để có thể cập nhật/xóa */}
      <UserList users={users} fetchUsers={fetchUsers} />
    </div>
  );
}

export default App;
