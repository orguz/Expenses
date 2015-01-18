/**
 * Created by orguz on 12/27/14.
 */

"use strict";

var config = require('../config/default.js');

//TODO: Should be removed
//--------
//Models
//--------
var Configuration = require('../models/configuration');
var router = require('express').Router();

module.exports = function (app) {
    //TODO: Add verify token middleware
    //TODO: Move logic to other modules
    //Add categories, when IsDefaultCategories flag is true means add only default categories
    router.post('/addCategories', function (req, res, next) {
        var configuration = new Configuration();
        configuration.owner = req.headers.userid;

        if (req.body.IsDefaultCategories == true) {
            configuration.categories = config.DefaultCategories;
        }
        else {
            Configuration.findOne({owner: req.headers.userid}, function (err, configuration) {
                if (err) {
                    res.sendStatus(500);
                }
                configuration.categories.concat(req.body.categories);
            })
        }
        configuration.save(function (err, configuration) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.status(201).send({_id: configuration._id, defaultCategories: config.DefaultCategories});
        });
    });


    app.use('/config', router);
};
