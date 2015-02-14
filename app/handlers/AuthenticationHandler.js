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
        if (user == undefined){
            cb("User does not exist");
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
    userDao.findOne(user.username, function (err,retUser){
        if (err){
            cb(err);
        }
        else {
            if (retUser != null){
                cb("User already exists");
            }
            else{
                userDao.save(user, function (err, userId) {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null, userId);
                    }
                });
            }

        }
    });

};
