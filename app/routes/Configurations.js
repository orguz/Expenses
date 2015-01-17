/**
 * Created by orguz on 12/27/14.
 */

var config = require('../config/config.js');

//--------
//Models
//--------
var Configuration = require('../models/configuration');


//--------
//Services
//--------
var services = {};

//Add categories, when IsDefaultCategories flag is true means add only default categories
exports.addCategories = function (req, res) {
    var configuration = new Configuration();
    configuration.owner = req.headers.userid;

    if (req.body.IsDefaultCategories == true) {
        configuration.categories = config.defaultCategories;
    }
    else {
        Configuration.findOne({owner: req.headers.userid}, function (err, configuration) {
            if (err) {
                res.sendStatus(500);
            }
            configuration.categories.concat(req.body.categories);
        })
    };

    configuration.save(function (err, configuration) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.status(201).send({_id: configuration._id, defaultCategories: config.defaultCategories});
    });
};