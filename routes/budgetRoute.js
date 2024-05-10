const express = require('express');

const router = express.Router();

const { createBudget, getbudgets, getBudgetsById, deleteBudget } = require('../controllers/budgetController');


router.post('/addbudget', createBudget)
router.get('/getbudgets', getbudgets)
router.get('/budget/:id', getBudgetsById)
router.delete('/deletebudget/:budgetid', deleteBudget)
module.exports = router
