/*

Contains API endpoints to 
	register user
	and do other stuff

*/

/*

Always follows AUTHENTICATE , AUTHORIZE , VALIDATE and then to models 

*/

var path = require('path');
var user = require(path.join(__dirname,'..','controller','user'));
var ques = require(path.join(__dirname,'..','controller','question'));
var test = require(path.join(__dirname,'..','controller','test'));
var auth = require(path.join(__dirname,'..','auth','authenticate'));

module.exports = function(app){

	app.post('/signup',user.signup);

	app.get('/login',user.login);

	app.post('/logout',auth.authenticateRequest,user.logout);

	// only for debug purpose
	app.post('/question', auth.authenticateRequest, ques.createQuestion);
	app.get('/question', auth.authenticateRequest, ques.getQuestion);

	app.post('/test', auth.authenticateRequest, test.createTest);
	app.get('/test', auth.authenticateRequest, test.getTest);
}