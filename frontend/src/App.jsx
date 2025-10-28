import React, { useState } from "react";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <h1>Quản lý User</h1>
      <AddUser onUserAdded={() => setRefresh(!refresh)} />
      <UserList refresh={refresh} />
    </div>
  );
}

export default App;
