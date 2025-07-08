const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');

exports.setBudget = async (req, res) => {
  const { month, incomeLimit, expenseLimit } = req.body;
  try {
    const budget = await Budget.findOneAndUpdate(
      { userId: req.user, month },
      { incomeLimit, expenseLimit },
      { new: true, upsert: true }
    );
    res.json(budget);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getBudget = async (req, res) => {
  const { month } = req.query;
  try {
    const budget = await Budget.findOne({ userId: req.user, month });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.getBudgetStats = async (req, res) => {
  const { month } = req.query;
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  try {
    const transactions = await Transaction.find({
      userId: req.user,
      date: { $gte: start, $lt: end }
    });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);

    res.json({ totalIncome, totalExpense });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
