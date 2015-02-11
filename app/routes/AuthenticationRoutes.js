/**
 * Created by orguz on 12/27/14.
 */

"use strict";

//Config module
var config = require('config');

//Libs
var auth = require('../libs/token-auth.js');

//Controllers
var authenticationCtrl = require('../controllers/AuthenticationCtrl.js');

var router = require('express').Router();

module.exports = function (app) {
    //Login
    router.post('/login', function (req, res, next) {

        if (req.body.user === 'undefined' || req.body.user == null) {
            return res.status(400).send('User was not supplied');
        }

        if (req.body.user.username == '' || req.body.user.password == '') {
            return res.status(400).send('User name and Password must be supplied');
        }

        next();
    }, authenticationCtrl.login);


    //Register
    router.post('/register', function (req, res, next) {
        if (req.body.user === 'undefined' || req.body.user == null) {
            return res.status(400).send('User was not supplied');
        }

        if (req.body.user.username == '' || req.body.user.password == '' || req.body.user.email == '' || req.body.user.first_name == '' || req.body.user.last_name == '') {
            return res.status(400).send('Missing user data');
        }

        next();
    }, authenticationCtrl.register);




    //Logout
    router.post('/logout', function (req, res) {
        return res.sendStatus(200);
    });

    app.use('/serverauth', router);
};