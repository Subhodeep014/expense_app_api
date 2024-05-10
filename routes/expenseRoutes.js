const express = require("express");
const router = express.Router()
const cors = require("cors");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/addexpense', addExpense)
router.get('/getexpenses', getExpenses)
router.delete('/expensedelete/:expenseid', deleteExpense)
module.exports = router