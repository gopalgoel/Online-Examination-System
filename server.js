var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var port = process.env.PORT || 8000;

mongoose.connect(config.database);
app.set('secretKey', config.secretKey);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.listen(port);

//routes
app.get('/', function(req,res){
	res.end("Hello world! An excellent api coming soon.");
});

var apiRouter = express.Router();
app.use('/api',apiRouter);

apiRouter.use(function(req,res,next){
	res.write("Inside MiddleWare. ");
	next();
});

apiRouter.get('/', function(req,res){
	res.end("MiddleWare in action.");
});
