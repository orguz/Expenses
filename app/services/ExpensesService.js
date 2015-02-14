/**
 * Created by orguz on 1/18/15.
 */

"use strict";

var expenseHandler = require('../handlers/ExpenseHandler');

module.exports.addExpense = function (expense, userId, callback) {


    expenseHandler.addExpense(expense, userId, function (err, id) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, id)
        }
    });


};

module.exports.getExpenses = function (userId, callback) {


    expenseHandler.getExpenses(userId, function (err, expenses) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, expenses)
        }
    });


};
