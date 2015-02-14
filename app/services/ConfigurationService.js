/**
 * Created by orguz on 1/18/15.
 */

"use strict";

var configurationHandler = require('../handlers/ConfigurationHandler');

module.exports.addCategories = function (userId, body, callback) {


    configurationHandler.addCategories(userId, body, function (err, categories) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, {categories: categories})
        }
    });
};

module.exports.getCategories = function (userId, callback) {


    configurationHandler.getCategories(userId, function (err, categories) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, {categories: categories})
        }
    });
};
