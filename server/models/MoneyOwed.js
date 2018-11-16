const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema and Model
const MoneyOwedSchema = new Schema({
  lenderId: String,
  debtorId: String,
  amount: Number,
});

module.exports = mongoose.model('MoneyOwed', MoneyOwedSchema);
