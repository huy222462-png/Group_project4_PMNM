import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ onUserAdded }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name: userName, email: userEmail };

    axios.post("http://localhost:3000/users", newUser)
      .then(res => {
        alert(res.data.message);
        if (onUserAdded) onUserAdded(); // cập nhật danh sách
        setUserName("");
        setUserEmail("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={userName} 
          onChange={e => setUserName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={userEmail} 
          onChange={e => setUserEmail(e.target.value)} 
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;
