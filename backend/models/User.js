const mongoose = require('mongoose'); // chay moongoose library

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
