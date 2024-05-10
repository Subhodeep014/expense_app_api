const mongoose = require("mongoose");
const { Schema } = mongoose;
const axios = require("axios")


const budgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
    },
    amount: Number,
    color: {
      type: String,
    },
  },
  {
    // Add a unique compound index on 'name' and 'email' fields
    indexes: [{ fields: { name: 1, email: 1 }, unique: true }],
  }
);

const BudgetModel = mongoose.model("Budget", budgetSchema);
module.exports = BudgetModel;