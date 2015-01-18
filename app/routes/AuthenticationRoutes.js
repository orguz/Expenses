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

//TODO: Should be removed
//--------
//Models
//--------
var User = require('../models/user');

var router = require('express').Router();

module.exports = function (app) {
    //TODO: Move logic to other modules
    //Login
    router.post('/login', function (req, res, next) {

        if (req.body.user === 'undefined' || req.body.user == null) {
            res.status(400).send('User was not supplied');
        }

        if (req.body.user.username == '' || req.body.user.password == '') {
            return res.status(400).send('User name and Password must be supplied');
        }

        next();
    }, authenticationCtrl.login);


    //TODO: Move logic to other modules
    //Register
    router.post('/register', function (req, res, next) {
        var username = req.body.user.username || '';
        var password = req.body.user.password || '';
        var email = req.body.user.email || '';
        var firstName = req.body.user.first_name || '';
        var lastName = req.body.user.last_name || '';

        if (username == '' || password == '') {
            return res.sendStatus(400);
        }

        var user = new User();
        user.username = username;
        user.password = password;
        user.email = email;
        user.first_name = firstName;
        user.last_name = lastName;

        user.save(function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            User.count(function (err, counter) {
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.status(201).send({token: auth.issueToken({id: user._id}), userId: user._id});
            });

        });
    });


    //TODO: Move logic to other modules
    //Register
    router.post('/logout', function (req, res, next) {
        console.log("begin logout on server" + req.headers.userid);

        return res.sendStatus(200);
    });

    app.use('/serverauth', router);
};