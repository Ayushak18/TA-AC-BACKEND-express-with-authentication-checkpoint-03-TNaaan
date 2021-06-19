let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let incomeSchema = new Schema(
  {
    source: String,
    amount: Number,
    date: Date.now,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps }
);

let Income = mongoose.model('income', incomeSchema);

module.exports = Income;
