/**
 * Created by orguz on 1/18/15.
 */

'use strict';

var configurationDao = require('../dao/ConfigurationDAO');
var config = require('../config/default.js');

exports.addCategories = function (userId, body, cb) {

    var configData = new Object();
    configData.owner = userId;

    if (body.IsDefaultCategories == true) {
        configData.categories = config.DefaultCategories;
    }
    else {
        configurationDao.findOne({owner: userId}, function (err, configuration) {
            if (err) {
                cb(err);
            }
            configuration.categories.concat(body.categories);
        })
    }
    configurationDao.save(configData, function (err, categories) {
        if (err) {
            cb(err);
        }
        else {
            cb(null, categories);
        }
    });


};
