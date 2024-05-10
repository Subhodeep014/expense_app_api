const express = require("express");
const router = express.Router()

const { addExpense, getExpenses, deleteExpense } = require("../controllers/expenseController");



router.post('/addexpense', addExpense)
router.get('/getexpenses', getExpenses)
router.delete('/expensedelete/:expenseid', deleteExpense)
module.exports = router
