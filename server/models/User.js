const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema and Model
const UserSchema = new Schema({
  name: String,
  color: Number,
});

module.exports = mongoose.model('User', UserSchema);
