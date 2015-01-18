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
        if (user == undefined) {
            cb(err);
        }
        //Success returning user
        cb(null, user);
    })
};
