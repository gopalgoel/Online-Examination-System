var path = require('path');
var ques = require(path.join(__dirname,'..','controller','ques'));
var auth = require(path.join(__dirname,'..','auth','authenticate'));

module.exports = function(app){
    app.post('/question', auth.authenticateRequest, ques.createQuestion);
	app.get('/question', auth.authenticateRequest, ques.getQuestion);
    app.put('/question', auth.authenticateRequest,ques.updateQuestion);
    app.delete('/question', auth.authenticateRequest,ques.deleteQuestion);
}