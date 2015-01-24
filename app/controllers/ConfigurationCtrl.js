/**
 * Created by orguz on 1/18/15.
 */
"use strict";

var configurationService = require('../services/ConfigurationService');

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
