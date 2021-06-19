let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let expenseSchema = new Schema(
  {
    category: String,
    amount: Number,
    date: Date.now,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps }
);

let Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;
