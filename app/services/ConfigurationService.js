/**
 * Created by orguz on 1/18/15.
 */

"use strict";

var configurationHandler = require('../handlers/ConfigurationHandler');

module.exports.addCategories = function (userId, body, callback) {

//var configuration = new Configuration();
//configuration.owner = req.headers.userid;
//
//if (req.body.IsDefaultCategories == true) {
//    configuration.categories = config.DefaultCategories;
//}
//else {
//    Configuration.findOne({owner: req.headers.userid}, function (err, configuration) {
//        if (err) {
//            res.sendStatus(500);
//        }
//        configuration.categories.concat(req.body.categories);
//    })
//}
//configuration.save(function (err, configuration) {
//    if (err) {
//        console.log(err);
//        return res.sendStatus(500);
//    }
//    res.status(201).send({_id: configuration._id, defaultCategories: config.DefaultCategories});
//});






    configurationHandler.addCategories(userId, body, function (err, categories) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, {categories: categories})
        }
    });
};
//
//module.exports.register = function (user, callback) {
//    authenticationHandler.register(user, function (err, userId) {
//        if (err) {
//            callback(err);
//        }
//        else {
//            callback(null, {token: auth.issueToken({id: userId}), userId: userId})
//        }
//    });
//};
//
//
