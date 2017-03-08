var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require(path.join(__dirname,'app','config','config'));
var port = process.env.PORT || config.SERVER_PORT;

var routes = require(path.join(__dirname, 'app', 'routes', 'routes'));


app.set('secretKey', config.secretKey);

//we can parse both json as well as form data , but we dont want to do form data
//only JSON

//http://stackoverflow.com/questions/4024271/rest-api-best-practices-where-to-put-parameters
app.use(bodyParser.urlencoded({extended: false }));// for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());// for parsing application/json

app.listen(port,function(){
	console.log("Server Started at "+port);
});

//API ENDPOINT

//VERY IMPORTANT
routes(app);


app.get('/', function(req,res){
	res.send("Hello world! An excellent api coming soon.");
});



//******************************************************************
/*REMOVE BELOW CODE ON ANALYZATION */
/*
var apiRouter = express.Router();
app.use('/api',apiRouter);

apiRouter.use(function(req,res,next){
	res.write("Inside MiddleWare. ");
	next();
});

apiRouter.get('/', function(req,res){
	res.end("MiddleWare in action.");
});

*/
