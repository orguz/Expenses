/**
 * Created by orguz on 1/18/15.
 */

'use strict';

var userDao = require('../dao/UserDAO');
var bcrypt = require('bcrypt');

exports.login = function (username, password, cb) {
    userDao.findOne(username, function (err, user) {
        if (err) {
            cb(err);
        }
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) return cb(err);
            if (!isMatch) {
                cb('Incorrect password')
            }
            else {
                cb(null, user._id);
            }
        });
    });
};


exports.register = function (user, cb) {
    userDao.save(user, function (err, userId) {
        if (err) {
            cb(err);
        }
        else {
            cb(null, userId);
        }
    });
};