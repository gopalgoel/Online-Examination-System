/*
This will contain the DB interactions . Although it is said that , when you are at this stage 
you dont want to handle the res or req objects , rather only the important parameters .
The request till this point is authenticated and authorized , validated 
*/

var path = require('path');
var userModel = require(path.join(__dirname,'userSchema'));
exports.signup = function(req,res){
    //only DB errors possible . other errors handled already at this point 
    var newUser = new userModel({
        username:req.query.username,
        password:req.query.password,
        role:req.query.role,
        email:req.query.email
    });
    newUser.save(function(error){
        if(error)
            res.send("Error in Creating User");
        res.send("User Created");
    });
}