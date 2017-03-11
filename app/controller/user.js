/*
This will contain the DB interactions . Although it is said that , when you are at this stage
you dont want to handle the res or req objects , rather only the important parameters .
The request till this point is authenticated and authorized , validated
*/

var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var userModel = require(path.join(__dirname,'..','models','userSchema'));
var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

exports.signup = function(req,res){
    //we dont repeat the username
    userModel.findOne({username:req.query.username},function(err,docs){
        if(err)
            res.json(response(true,err,"",""));
        else if(docs != null)
            res.json(response(true,"Username already Taken","",""));
        else{
            var newUser = new userModel({
                name: req.query.name,
                email: req.query.email,
                username: req.query.username,
                password: req.query.password,
                role: req.query.role
            });
            newUser.save(function(error){
                if(error)
                    res.json(response(true,error,"",""));
                res.json(response(false,"","UserCreated",""));
            });
        }
    });
}

exports.login = function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    userModel.findOne({username:username},function(err,docs){
        if(err || docs==null)
            res.json(true,"User Not Found","","");
        else{ 
            if(bcrypt.compareSync(password, docs.password)){
                console.log(JSON.stringify(docs, null, 4));
                var token = jwt.sign(JSON.stringify(docs),config.secretKey);
                res.json(response(false,"","Token Sent",token));
            }
            else{
                res.json(response(true,"UserName-Password Combo dont match","",""));
            }
        }
    });
}

exports.logout = function(req,res){
    //req.decoded is already present now because of auth that we did
    //Well Logout has to be done client side so just return success
    console.log(JSON.stringify(req.decoded, null, 4));
    res.json(response(false,"","Logged Out",""));
}