/**
 * Created by orguz on 12/27/14.
 */

"use strict";


//--------
//Models
//--------
var router = require('express').Router();

//Controllers
var configurationCtrl = require('../controllers/ConfigurationCtrl.js');

module.exports = function (app) {
    //Add categories, when IsDefaultCategories flag is true means add only default categories
    router.post('/addCategories', function (req, res, next) {
        if (req.headers.userid == undefined || req.headers.userid == null) {
            return res.status(400).send('UserId header was not supplied');
        }

        if (req.body.IsDefaultCategories  == undefined) {
            return res.status(400).send('IsDefaultCategories was not supplied');
        }

        if (req.body.IsDefaultCategories  === false && (req.body.categories == null || req.body.categories == undefined)) {
            return res.status(400).send('Categories were not supplied');
        }

        next();
    }, configurationCtrl.addCategories);

    router.get('/getCategories', function (req, res, next) {
        if (req.headers.userid == undefined || req.headers.userid == null) {
            return res.status(400).send('UserId header was not supplied');
        }

        next();
    }, configurationCtrl.getCategories);


    app.use('/config', router);


};


