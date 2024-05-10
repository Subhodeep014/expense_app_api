
const Budget = require('../models/budget');
const Expense = require('../models/expense')
const createBudget = async (req, res) => {
  const { budgetName, budgetAmount, email , color} = req.body;

  try {
    if (!budgetName) {
      return res.json({ error: "Budget should have a name" });
    }
    if (!budgetAmount) {
      return res.json({ error: "Budget should have an amount" });
    }

    // Check if the budget already exists for the specified email
    const existingBudget = await Budget.findOne({ name: budgetName, email: email });
    if (existingBudget) {
      return res.json({ error: `${budgetName} budget already exists for ${email}` });
    }

    // If the budget doesn't exist, create a new budget
    const budget = await Budget.create({
      name: budgetName,
      amount: Number(budgetAmount),
      email: email,
      color:color,
    });

    return res.json(budget);
  } catch (error) {
    return res.json({ error: "Error creating budget" });
  }
};

const getbudgets = async (req, res) => {
  try {
    const { email } = req.query; // Extract email parameter from query
    const budgets = await Budget.find({ email: email }); // Filter budgets by email
    res.json(budgets);
  } catch (error) {
    res.json({ error: "Error fetching budgets" });
  }
};

const deleteBudget = async(req,res)=>{
  try {
    const {budgetid} = req.params; 
    // deleleting budget
    await Budget.deleteOne({_id:budgetid})

    // deleting expenses related to deleted budget

    await Expense.deleteMany({budgetid: budgetid})
    res.json({ message: "Budget and related expenses deleted successfully" });
  } catch (error) {
    res.json({
      error: "Failed to delete"
    })
  }
} 
const getBudgetsById = async(req,res)=>{
  try {
    const id = req.params.id;
    res.json("success")
  } catch (error) {
    
  }
  

}

module.exports = { createBudget, getbudgets, getBudgetsById, deleteBudget };
