var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var jwt = require('jsonwebtoken');

exports.authenticateRequest = function(req,res,next){
    var token = req.headers['authorization'];
    if(token == null){
        res.json(response(true,"authorization headers not present","",""));
    }
    else{
        jwt.verify(token, config.secretKey, function(err, decoded) {			
			if (err) {
				return res.json(response(true,"Bad Token","",""));		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});
    }
};