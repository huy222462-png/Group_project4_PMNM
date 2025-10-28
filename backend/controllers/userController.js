let users = []; // mảng tạm

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Thiếu name hoặc email" });
  }

  const newUser = {
    id: users.length + 1, // tạo id tự động
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    data: newUser
  });
};
