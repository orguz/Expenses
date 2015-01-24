'use strict';

//Require modules
var fs = require('fs');
var express = require('express');
var config = require('config');

//Express
var app = express();

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Connet to mongo using mongoose
require('./app/config/mongoose')();

// Bootstrap application settings
require('./app/config/express')(app);

// Load routes
require('./app/routes')(app);

//App starting to listen
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express app started on port ' + port);

module.exports = app;
