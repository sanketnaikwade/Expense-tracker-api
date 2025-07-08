const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  type: { type: String, enum: ['income', 'expense'] },
  amount: Number,
  category: String,
  note: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
// This code defines a Mongoose schema for a Transaction model in a Node.js application.