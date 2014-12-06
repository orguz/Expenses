'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./app/config/config.js');
var jwt = require('jsonwebtoken');
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
    res.sendFile(__dirname + '/public/index.html')
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/serverauth/login', function (req, res) {
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
            console.log('test');
            var token = jwt.sign({id: user._id}, config.SECRET_TOKEN, {expiresInMinutes: config.TOKEN_EXPIRATION});
            console.log('succesful log in, token: ' + token);
            return res.json({token: token, userId: user._id});
        });

    });
});

app.post('/serverauth/register', function (req, res) {
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
            console.log('userid for new user on server side before sending response' + user.id);
            var token = jwt.sign({id: user._id}, config.SECRET_TOKEN, {expiresInMinutes: config.TOKEN_EXPIRATION});
            res.status(201).send({token: token, userId: user._id});
        });

    });

});

app.post('serverauth/logout', function (req, res) {
        //tokenManager.expireToken(req.headers);
        return res.send(200);

    //else {
    //    return res.send(401);
    //}
});
var server = app.listen(process.env.PORT || 5000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

