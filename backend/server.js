const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Import routes
const userRoutes = require('./routes/user');
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));