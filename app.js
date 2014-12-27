'use strict';

//Require modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./app/config/config.js');

var app = express();
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

//DB Connection
mongoose.connect('mongodb://orguz:orguz@ds057000.mongolab.com:57000/expenses'); // connect to our database


//Defining middleware-s
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

//--------
//Services
//--------
var services = {};
//services.tokenAuth = require('./app/services/TokenAuthService.js');


//--------
//Routes
//--------
var routes = {};
routes.auth = require('./app/routes/Authentication.js');



// ROUTES FOR OUR API
// =============================================================================

//Default route
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

//Login
app.post('/serverauth/login', routes.auth.login);

//Register
app.post('/serverauth/register', routes.auth.register);

//Logout
app.post('/serverauth/logout', routes.auth.logout);



//Server definition
var server = app.listen(process.env.PORT || 5000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});

