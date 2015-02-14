/**
 * Created by orguz on 1/18/15.
 */
"use strict";

var authenticationService = require('../services/AuthenticationService');

module.exports.login = function (req, res) {

    var username = req.body.user.username;
    var password = req.body.user.password;

    authenticationService.login(username, password, function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    });
};

module.exports.register = function (req, res, next) {

    var user = new Object();
    user.username = req.body.user.username;
    user.password = req.body.user.password;
    user.email = req.body.user.email;
    user.first_name = req.body.user.first_name;
    user.last_name = req.body.user.last_name;

    authenticationService.register(user, function (err, data) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    });
};


