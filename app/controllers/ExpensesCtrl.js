/**
 * Created by orguz on 1/18/15.
 */
"use strict";

//var configurationService = require('../services/ConfigurationService');

module.exports.addCategories = function (req, res) {


    configurationService.addCategories(req.headers.userid, req.body, function (err, categories) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(categories);
        }
    });
};