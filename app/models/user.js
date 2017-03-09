/*
This will contain the DB interactions . Although it is said that , when you are at this stage 
you dont want to handle the res or req objects , rather only the important parameters .
The request till this point is authenticated and authorized , validated 
*/

var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var cache = require(path.join(__dirname,'..','config','cache'));
var userModel = require(path.join(__dirname,'userSchema'));
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
                username:req.query.username,
                password:req.query.password,
                role:req.query.role,
                email:req.query.email
            });
            newUser.save(function(error){
                if(error)
                    res.json(response(true,"Db error","",""));
                res.json(response(false,"","UserCreated",""));
            });
        } 
    });
}

exports.login = function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    userModel.findOne({username:username,password:password},function(err,docs){
        if(err)
            res.json(response(true,err,"",""));
        else if(docs == null){
            res.json(response(true,"UserName-Password Combo dont match","",""));
        }
        else{
            console.log(JSON.stringify(docs, null, 4));
            var token = jwt.sign(JSON.stringify(docs),config.secretKey);
            cache.set(token,"session");
            mykeys = cache.keys();
            console.log(mykeys);//debug purposes
            res.json(response(false,"","Token Sent",token));
        }
    });
}

exports.logout = function(req,res){
    var token = req.headers['authorization'];//custom header
    var value = cache.get(token);
    if(value != null){
        var val = cache.del(token);
        res.json(response(false,"","Logged Out",""));
    }  
    else
        res.json(response(true,"No such token issued","",""));
}