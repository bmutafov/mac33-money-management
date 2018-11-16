const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema and Model
const DebtSchema = new Schema({
  lenderId: String,
  debtorId: String,
  expenseId: String,
  amount: Number,
});

module.exports = mongoose.model('Debt', DebtSchema);
