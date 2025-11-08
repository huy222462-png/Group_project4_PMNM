import React from "react";
import { useAuth } from "../context/AuthContext";
import AddUser from "./AddUser";
import UserList from "./UserList";
import "../styles/Home.css";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h2>Chào mừng, {user?.name || user?.email}!</h2>
        <p>Bạn đã đăng nhập thành công vào hệ thống quản lý người dùng.</p>
      </div>

      <div className="content-section">
        <AddUser />
        <UserList />
      </div>
    </div>
  );
};

export default Home;
