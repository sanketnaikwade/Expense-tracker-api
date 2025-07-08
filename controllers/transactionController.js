const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.addTransaction = async (req, res) => {
  const { type, amount, category, note, date } = req.body;
  try {
    const transaction = await Transaction.create({
      userId: req.user,
      type,
      amount,
      category,
      note,
      date
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId: req.user },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await Transaction.findOneAndDelete({ _id: id, userId: req.user });
    res.json({ msg: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
