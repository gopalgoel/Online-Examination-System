var path = require('path');
var test = require(path.join(__dirname,'..','controller','test'));
var auth = require(path.join(__dirname,'..','auth','authenticate'));

module.exports = function(app){
	app.post('/test', auth.authenticateRequest, test.createTest);
	app.get('/test', auth.authenticateRequest, test.getTest);
	app.put('/test', auth.authenticateRequest, test.updateTest);
	app.delete('/test', auth.authenticateRequest, test.deleteTest);
	
	app.post('/test/add', auth.authenticateRequest, test.addQuestionToTest,test.updateTest);

	app.post('/test/request', auth.authenticateRequest, test.addRequest,test.updateTest);
	app.get('/test/request' , auth.authenticateRequest, test.getRequest);
	app.put('/test/request', auth.authenticateRequest, test.acceptRequest,test.updateTest);
	app.delete('/test/request', auth.authenticateRequest, test.deleteRequest,test.updateTest);
};