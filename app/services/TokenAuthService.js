/**
 * Created by orguz on 12/20/14.
 */
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');


module.exports.issueToken = function(payload) {
    var token = jwt.sign(payload, config.SECRET_TOKEN, {expiresInMinutes: config.TOKEN_EXPIRATION});
    return token;
};

module.exports.verifyToken = function(token, userId, verified) {
    var decodedToken = jwt.decode(token);
    console.log(decodedToken.id, userId);
    if (decodedToken.id != userId){
        return  verified("UserId mismatched UserId from token");
    }
    return jwt.verify(token, config.SECRET_TOKEN, {}, verified);
};