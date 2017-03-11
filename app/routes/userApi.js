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
var auth = require(path.join(__dirname,'..','auth','authenticate'));

module.exports = function(app){
	
	app.post('/signup',user.signup);

	app.post('/login',user.login);

	app.post('/logout',auth.authenticateRequest,user.logout);

}