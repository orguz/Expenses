/**
 * Created by orguz on 12/1/14.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var User = require('../models/user');

var ExpenseSchema   = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, ref: 'User'},
    date: { type: Date, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false }
});


module.exports = mongoose.model('Expense', ExpenseSchema);
