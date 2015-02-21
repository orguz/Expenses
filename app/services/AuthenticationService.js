/**
 * Created by orguz on 1/18/15.
 */

"use strict";

var authenticationHandler = require('../handlers/AuthenticationHandler'),
    auth = require('../libs/token-auth.js');

module.exports.login = function (username, password, callback) {
    authenticationHandler.login(username, password, function (err, userId) {
        if (err) {
            callback(err);
        }
        else {
            callback(false, {token: auth.issueToken({id: userId}), userId: userId})
        }
    });
};

module.exports.register = function (user, callback) {
    authenticationHandler.register(user, function (err, userId) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, {token: auth.issueToken({id: userId}), userId: userId})
        }
    });
};


