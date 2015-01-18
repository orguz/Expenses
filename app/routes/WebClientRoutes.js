/**
 * Created by orguz on 1/17/15.
 */

"use strict";
var router  = require('express').Router();
var path = require('path');


module.exports = function(app) {
    /* GET home page. */
    router.get('/', function(req, res) {
        res.sendFile('index.html');
    });

    app.use('/', router);

};
