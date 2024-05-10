const Expense = require("../models/expense")

const addExpense = async(req,res)=>{
    const {expenseName, expenseAmount, budgetId, email} = req.body;

    const expense = await Expense.create({
        expensename: expenseName,
        expenseamount : Number(expenseAmount),
        budgetid : budgetId,
        email:email,
    })
    res.json(expense)
}

const getExpenses = async(req,res)=>{

    try {
        const {email} = req.query;
        console.log(email);
        const expenses = await Expense.find({email: email});
        res.json(expenses)
    } catch (error) {
        res.json({error: "Error in fetching expenses"})
    }
}

const deleteExpense = async(req,res)=>{
    try {
        const {expenseid}  = req.params;
        console.log(expenseid)
        await Expense.deleteOne({_id:expenseid})
        console.log("at delete expense")
        res.json({
            message: "Expense deleted successfully"
        })

    } catch (error) {
        res.json({
            error: "Failed to delete expense"
        })
    }
}
module.exports = {addExpense, getExpenses, deleteExpense}