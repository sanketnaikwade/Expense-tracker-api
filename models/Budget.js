const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  month: String, // e.g., "2025-07"
  incomeLimit: Number,
  expenseLimit: Number
});

module.exports = mongoose.model('Budget', budgetSchema);
// This code defines a Mongoose schema for a Budget model in a Node.js application.