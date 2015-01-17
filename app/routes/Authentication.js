/**
 * Created by orguz on 12/27/14.
 */


//--------
//Models
//--------
var User = require('../models/user');


//--------
//Services
//--------
var services = {};
services.tokenAuth = require('../services/TokenAuthService.js');

//Login function
exports.login = function (req, res) {
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
            return res.json({token: services.tokenAuth.issueToken({id: user._id}), userId: user._id});
        });

    });
};

//Register function
exports.register = function (req, res) {
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
            res.status(201).send({token: services.tokenAuth.issueToken({id: user._id}), userId: user._id});
        });

    });
};

//Register function
exports.logout = function (req, res) {
    console.log("begin logout on server" + req.headers.userid);

    return res.sendStatus(200);
};