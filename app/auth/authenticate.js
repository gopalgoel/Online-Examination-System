var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var cache = require(path.join(__dirname,'..','config','cache'));
var jwt = require('jsonwebtoken');

exports.authenticateRequest = function(req,res,next){
    var token = req.headers['authorization'];
    if(token == null){
        //the headers may not be present
        res.json(response(true,"authorization headers not present","",""));
    }
    else{
        var value = cache.get(token);
        if(value != null){
            //our token exists in cache . Hence it was issued
            //decode the token and get the payload
            var payload = jwt.decode(token,config.secretkey);
            if(payload != null){
                req.id = payload._id;
                req.role = payload.role
                next();
            }
            else
                res.json(response(true,"Payload is Empty","",""))
        }
        else
            res.json(response(true,"Token not issued","",""));
    }
};