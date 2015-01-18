/**
 * Created by orguz on 12/27/14.
 */
"use strict";


//--------
//Models
//--------
var Expense = require('../models/expense');

var router = require('express').Router();

module.exports = function (app) {
    //TODO: Move logic to other modules
    //Login
    router.post('/addExpense', function (req, res, next) {
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
            res.status(201).send({_id: expense._id});

        });
    });


    //TODO: Move logic to other modules
    //Register
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