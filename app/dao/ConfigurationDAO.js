/**
 * Created by orguz on 1/18/15.
 */
//--------
//Models
//--------
var Configuration = require('../models/configuration');

exports.findOne = function (owner, cb) {
    User.findOne({owner: owner}, function (err, config) {
        if (err) {
            cb(err);
        }
        if (config == undefined) {
            cb(err);
        }
        //Success returning user
        cb(null, config);
    })
};

exports.save = function (configData, cb) {
    var config = new Configuration();
    config.owner = configData.owner;
    config.categories = configData.categories;

    config.save(function (err, config) {
        if (err || config == undefined) {
            cb(err);
        }
        else {
                cb(null, config.categories);
        }
    })
};