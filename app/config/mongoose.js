/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var config = require('config');


/**
 * Expose
 */

module.exports = function () {

    // Connect to mongodb - Movie like express
    var connect = function () {
        var options = { server: { socketOptions: { keepAlive: 1 } } };
        mongoose.set('debug', true);
        mongoose.connect(config.db.path, options);
    };
    connect();
    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);

};