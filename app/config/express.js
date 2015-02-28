/**
 * Module dependencies.
 */

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('config');

/**
 * Expose
 */

module.exports = function (app) {
    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://calc-expenses.herokuapp.com');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
    };

    // Compression middleware (should be placed before express.static)
    app.use(compression({
        threshold: 512
    }));

    // Static files middleware
    app.use(express.static(path.join(__dirname, '../../public')));

    // Logging middleware
    app.use(morgan("combined"));

    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(allowCrossDomain);


};