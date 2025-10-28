const express = require('express');
const app = express();

// Middleware để parse JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import user routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
