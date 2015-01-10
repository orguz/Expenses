/**
 * Created by orguz on 12/20/14.
 */
var jwt = require('jsonwebtoken');
var config = require('../config/config.js');


module.exports.issueToken = function(payload) {
    var token = jwt.sign(payload, config.SECRET_TOKEN, {expiresInMinutes: config.TOKEN_EXPIRATION});
    return token;
};

module.exports.verifyToken = function(req,res,next) {
    var token = req.headers.authorization;
    var userId = req.headers.userid;

    if (!token || !userId){
        res.status(400).send('Required header was not supplied');
    }
    var decodedToken = jwt.decode(token);
    if (!decodedToken){
        res.status(404).send('Invalid token supplied');
    }
    console.log(decodedToken.id, userId);
    if (decodedToken.id != userId){
        return res.status(401).send('Token mismatched user id');
    }
    jwt.verify(token, config.SECRET_TOKEN, {}, function(err, token) {
        if (err) {
            return res.send(401).send('verify token rejected');
        }
        console.log("verifyToken Accepted");
        next();
    });
};