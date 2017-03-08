var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var config = require('./config');
var port = process.env.PORT || 8000;

app.set('secretKey', config.secretKey);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.listen(port);

//routes
app.get('/', function(req,res){
	res.end("Hello world! An excellent api coming soon");
});
