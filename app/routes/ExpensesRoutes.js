/**
 * Created by orguz on 12/27/14.
 */
"use strict";


//--------
//Models
//--------
var Expense = require('../models/expense');

var router = require('express').Router();

var expensesCtrl = require('../controllers/ExpensesCtrl.js');


module.exports = function (app) {
    //Add expense
    router.post('/addExpense', function (req, res, next) {
        if (req.body.expense == null || req.body.expense == undefined ||
            req.body.expense.date == '' || req.body.expense.value == '' ||
            req.body.expense.category == '' || req.body.expense.title == '' || req.body.expense.description == '') {
            return res.status(400).send('Missing expense data');
        }

        next();
    }, expensesCtrl.addExpense);


    router.get('/getExpenses', function (req, res, next) {
        if (req.headers.userid == '') {
            return res.status(400).send('Missing user id');
        }

        next();
    }, expensesCtrl.getExpenses);



    //TODO: Move logic to other modules
    //getExpense
    router.get('/:id', function (req, res, next) {
        Expense.findOne({owner: req.headers.userid, _id: req.param('id')}, function (err, expense) {
            if (err) {
                res.sendStatus(500);
            }
            res.status(200).send({expense: expense});

        });
    });


    //TODO: Move logic to other modules
    //Register
    router.get('/', function (req, res, next) {
        Expense.find({owner: req.headers.userid}, function (err, expenses) {
            if (err) {
                res.sendStatus(500);
            }
            res.status(200).send({expensesa: expenses});

        });
    });

    //TODO: Move logic to other modules
    //Register
    router.get('/:month/:year', function (req, res, next) {
        var start = new Date(req.param('year'), req.param('month') - 1, 1);
        var end = new Date(req.param('year'), req.param('month') - 1, 31);

        Expense.find({owner: req.headers.userid, date: {"$gte": start, "$lt": end}}, function (err, expenses) {
            if (err) {
                res.sendStatus(500);
            }
            res.status(200).send({expensesv: expenses});

        });
    });

    app.use('/expense', router);
};