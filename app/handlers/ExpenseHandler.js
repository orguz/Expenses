/**
 * Created by orguz on 1/18/15.
 */

'use strict';

var expenseDao = require('../dao/ExpenseDAO');
var config = require('../config/default.js');

exports.addExpense = function (expense, userId, cb) {

    expenseDao.save(expense, userId, function (err, id) {
        if (err) {
            cb(err);
        }
        else {
            cb(null, id);
        }
    });



};


exports.getExpenses = function (userId, cb) {

    expenseDao.find(userId, function (err, expenses) {
        if (err) {
            cb(err);
        }
        else {
            cb(null, expenses);
        }
    });



};

