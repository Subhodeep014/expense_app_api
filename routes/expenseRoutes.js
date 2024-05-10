const express = require("express");
const router = express.Router()
const cors = require("cors");
const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");

router.use(
    cors({
        credentials: true,
        origin: 'https://expensereactapp.netlify.app/api'
    })
)

router.post('/addexpense', addExpense)
router.get('/getexpenses', getExpenses)
router.delete('/expensedelete/:expenseid', deleteExpense)
module.exports = router
