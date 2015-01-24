/**
 * Created by orguz on 1/18/15.
 */
//--------
//Models
//--------
var User = require('../models/user');

exports.findOne = function (username, cb) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            cb(err);
        }
        //Success returning user
        cb(null, user);
    })
};

exports.save = function (userData, cb) {
    var user = new User();
    user.username = userData.username;
    user.password = userData.password;
    user.email = userData.email;
    user.first_name = userData.first_name;
    user.last_name = userData.last_name;

    user.save(function (err, user) {
        if (err || user == undefined) {
            cb(err);
        }
        else {
            //Success returning user
            cb(null, user._id);
        }
    })
};