var path = require('path');
var user = require(path.join(__dirname,'..','controller','user'));
var test = require(path.join(__dirname,'..','controller','test'));
var auth = require(path.join(__dirname,'..','auth','authenticate'));

module.exports = function(app){
	app.post('/signup',user.signup);
	app.get('/login',user.login);
	app.post('/logout',auth.authenticateRequest,user.logout);
}
