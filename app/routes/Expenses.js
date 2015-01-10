/**
 * Created by orguz on 12/27/14.
 */


//--------
//Models
//--------
var Expense = require('../models/expense');


//--------
//Services
//--------
var services = {};


//Add expense
exports.addExpense = function(req, res) {
    var expense = new Expense();
    console.log(req.body.expense);
    expense.owner = req.headers.userid;
    expense.date = req.body.expense.date || Date.now(); //change default now
    expense.value = req.body.expense.value;
    expense.category = req.body.expense.category;
    expense.title = req.body.expense.title;
    expense.description = req.body.expense.description || '';



    expense.save(function (err, expense) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(201).send({_id: expense._id });

    });
};

//get expense by id
exports.getExpenseById = function(req, res) {
    Expense.findOne({owner: req.headers.userid, _id: req.param('id')}, function(err, expense) {
        if (err){
            res.sendStatus(500);
        };
        res.status(200).send({expense: expense });

    })
};

//get all expenses
exports.getUserExpenses = function(req, res) {
    Expense.find({owner: req.headers.userid}, function(err, expenses){
        if (err){
            res.sendStatus(500);
        }
        res.status(200).send({expensesa: expenses });

    })
};

//get monthly expenses
exports.getMonthlyExpenses = function(req, res) {
    var start = new Date(req.param('year'),req.param('month')-1,1);
    var end = new Date(req.param('year'),req.param('month')-1,31);

    Expense.find({owner: req.headers.userid, date: {"$gte": start, "$lt": end}}, function(err, expenses){
        if (err){
            res.sendStatus(500);
        }
        res.status(200).send({expensesv: expenses });

    })
};

//Expense.findOne({ _id: expense._id })
//    .populate('owner')
//    .exec(function (err, expense1) {
//        if (err) return handleError(err);
//        res.status(201).send({expense1: expense1, owner: expense1.owner});
//        // prints "The creator is Aaron"
//    })