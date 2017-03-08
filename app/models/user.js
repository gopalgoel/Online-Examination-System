/*
This will contain the DB interactions . Although it is said that , when you are at this stage 
you dont want to handle the res or req objects , rather only the important parameters .
The request till this point is authenticated and authorized 
*/

var path = require('path');

exports.signup = function(req,res){
    var username = req.query.username;
    var password = req.query.password;
    //console.log(req.body);//contains content
    //console.log(req.params);//containing properties mapped to the named route “parameters”
    //console.log(req.query);//contains url queries
    if(username!=null && password!=null){
        //we just have to save in the DB 
        res.send("Okay registered bro");
    }
    else{
        //error , GIVE ME ALL THE STUFF BRO
        res.send("Error Hogaya Bro");
    }
}