// server.js
const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
