const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  setBudget,
  getBudget,
  getBudgetStats
} = require('../controllers/budgetController');

router.use(auth);

router.post('/', setBudget);
router.get('/', getBudget);
router.get('/stats', getBudgetStats);

module.exports = router;
