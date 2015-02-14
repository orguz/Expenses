/**
 * Created by orguz on 1/18/15.
 */
//--------
//Models
//--------
var Expense = require('../models/expense');
//
//exports.findOne = function (owner, cb) {
//    User.findOne({owner: owner}, function (err, config) {
//        if (err) {
//            cb(err);
//        }
//        if (config == undefined) {
//            cb(err);
//        }
//        //Success returning user
//        cb(null, config);
//    })
//};

exports.save = function (expenseData, userId, cb) {
    var expense = new Expense();
    console.log(expenseData);
    expense.owner = userId;
    expense.date = expenseData.date || Date.now(); //change default now
    expense.value = expenseData.value;
    expense.category = expenseData.category;
    expense.title = expenseData.title;
    expense.description = expenseData.description || '';


    expense.save(function (err, expense) {
        if (err) {
            cb(err);
        }
        cb(null, expense._id);

    });

};

exports.find = function (userId, cb) {
    Expense.find({owner: userId}, function (err, expenses) {
        if (err) {
            cb(err);
        }
        //Success returning user
        cb(null, expenses);
    })

};