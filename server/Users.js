// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String }, // for filtering tools nearby
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);
