/**
 * Created by orguz on 12/1/14.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    email: String,
    api_key: String,
    api_exp_date: Date
});

module.exports = mongoose.model('User', UserSchema);
