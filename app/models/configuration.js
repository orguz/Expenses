/**
 * Created by orguz on 12/1/14.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var User = require('../models/user');

var ConfigurationSchema   = new Schema({
    owner: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'User'},
    categories: { type: [String], required: true }
});


module.exports = mongoose.model('Configuration', ConfigurationSchema);
