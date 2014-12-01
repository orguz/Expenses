/**
 * Created by orguz on 12/1/14.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
