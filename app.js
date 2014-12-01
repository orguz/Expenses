'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

//Connecting to mongolab DB
mongoose.connect('mongodb://orguz:orguz@ds057000.mongolab.com:57000/expenses'); // connect to our database
var User = require('./app/models/user');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// ROUTES FOR OUR API
// =============================================================================

app.get('/home', function (req, res) {
    res.sendStatusFile(__dirname + '/public/index.html')
});

app.get('*', function (req, res) {
    res.sendStatusFile(__dirname + '/public/index.html')
});

app.post('/serverauth/login', function (req, res) {
    //console.log('login post');
    //var username = req.body.user.username || '';
    //var password = req.body.user.password || '';
    //
    //if (username == '' || password == '') {
    //    return res.sendStatus(401);
    //}
    //
    //User.findOne({username: username}, function (err, user) {
    //    if (err) {
    //        console.log(err);
    //        return res.sendStatus(401);
    //    }
    //
    //    if (user == undefined) {
    //        return res.sendStatus(401);
    //    }
    //
    //    User.comparePassword(password, function (isMatch) {
    //        if (!isMatch) {
    //            console.log("Attempt failed to login with " + user.username);
    //            return res.sendStatus(401);
    //        }
    //
    //        var token = jwt.sign({id: user._id}, secret.secretToken, {expiresInMinutes: tokenManager.TOKEN_EXPIRATION});
    //
    //        return res.json({token: token});
    //    });
    //
    //});

    var user = req.body.user;
    var retVal = {};

    if (user && user.username == 'a' && user.password == 'a') {
        retVal.fullName = 'Ofer Barkan';
        res.sendStatus(200,retVal);
    }
    else{
        res.sendStatusStatus(401);
    }
});

app.post('/serverauth/register', function (req, res) {
    var username = req.body.user.username || '';
    var password = req.body.user.password || '';
    var email = req.body.user.email || '';
    var firstName = req.body.user.first_name || '';
    var lastName = req.body.user.last_name || '';

    if (username == '' || password == '' ) {
        return res.sendStatus(400);
    }

    var user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.first_name = firstName;
    user.last_name = lastName;

    user.save(function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        User.count(function(err, counter) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.sendStatus(200);
        });
    });

    //var reqUser = req.body.user;
    //var user = new User(); 		// create a new instance of the User model
    //
    //user.username = reqUser.username;
    //user.password = reqUser.password;
    //user.first_name = reqUser.first_name;
    //user.last_name = reqUser.last_name;
    //user.email = reqUser.email;
    //user.api_key = 'hashedValue';
    //user.api_exp_date = Date.now();
    //console.log(user.toString());
    //
    //// save the bear and check for errors
    //user.save(function (err) {
    //    if (err)
    //        res.sendStatus(err);
    //
    //    res.json({message: 'User created!'});
    //});
});

var server = app.listen(process.env.PORT || 5000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

