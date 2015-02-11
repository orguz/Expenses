/**
 * Created by orguz on 1/18/15.
 */
"use strict";

var expensesService = require('../services/ExpensesService');

module.exports.addExpense = function (req, res) {


    expensesService.addExpense(req.body.expense, req.headers.userid, function (err, id) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send({_id: id});
        }
    });
};

