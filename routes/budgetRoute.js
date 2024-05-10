const express = require('express');

const router = express.Router();
const cors = require('cors');
const { createBudget, getbudgets, getBudgetsById, deleteBudget } = require('../controllers/budgetController');

router.use(
    cors({
        credentials: true,
        origin : 'http://localhost:5173'
    })
)
router.post('/addbudget', createBudget)
router.get('/getbudgets', getbudgets)
router.get('/budget/:id', getBudgetsById)
router.delete('/deletebudget/:budgetid', deleteBudget)
module.exports = router