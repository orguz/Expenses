'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));

app.get('/home', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/serverauth/login', function (req, res) {
    console.log(req.body);
    console.log(req.body.user);
    var user = req.body.user;
    var retVal = {};

    if (user && user.username == 'a' && user.password == 'a') {
        retVal.fullName = 'Ofer Barkan';
        res.send(200,retVal);
    }
    else{
        res.sendStatus(401);
    }
});

var server = app.listen(process.env.PORT || 5000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});
