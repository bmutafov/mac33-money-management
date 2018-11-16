const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema and Model
const ExpenseSchema = new Schema({
  payerId: String,
  amount: Number,
  date: String,
});

module.exports = mongoose.model('Expense', ExpenseSchema);
