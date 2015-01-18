/**
 * Created by orguz on 1/18/15.
 */
"use strict";

var authenticationService = require('../services/AuthenticationService');

module.exports.login = function (req, res) {

    var username = req.body.user.username;
    var password = req.body.user.password;

    authenticationService.login(username, password, function (err, data) {
        if (err) res.send(500);
        res.status(200).send(data);

    })
};