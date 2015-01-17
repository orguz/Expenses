/**
 * Created by orguz on 12/27/14.
 */

"use strict";

var config = require('config');
var auth = require('../libs/token-auth.js');

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
        console.log('Entered login function');
        var username = req.body.user.username || '';
        var password = req.body.user.password || '';
        console.log('user ' + username);
        console.log('pass ' + password);

        if (username == '' || password == '') {
            return res.sendStatus(401);
        }

        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }

            if (user == undefined) {
                return res.sendStatus(401);
            }

            user.comparePassword(password, function (isMatch) {
                if (!isMatch) {
                    console.log("Attempt failed to login with " + user.username);
                    return res.sendStatus(401);
                }
                return res.json({token: auth.issueToken({id: user._id}), userId: user._id});
            });

        });
    });


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