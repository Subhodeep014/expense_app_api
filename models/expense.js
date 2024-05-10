const mongoose = require("mongoose");

const {Schema} = mongoose;

const expenseSchema = new Schema(
    {
        expensename: {
            type: String,
            required : true
        },
        createdAt : {
            type: Date,
            default: Date.now,
        },
        expenseamount:{
            type: Number,
            required : true,
        },
        budgetid:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Budget' // Reference to another budget document
        },
        email:{
            type: String,
            required : true
        }

    }
)

const ExpenseModel = mongoose.model('Expense',expenseSchema);
module.exports = ExpenseModel;