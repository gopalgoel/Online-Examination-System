var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var testModel = require(path.join(__dirname,'..','models','testSchema'));
var userModel = require(path.join(__dirname,'..','models','userSchema'));
var questionModel = require(path.join(__dirname,'..','models','questionSchema'));

exports.createTest = function(req,res){
	var newTest = new testModel({
		testDate: req.query.testDate,
		name: req.query.name,
		owner: req.query.userId,
		timeDuration: req.query.timeDuration
	})
	newQues.save(function(error){
		if(error) res.json(response(true, "error", "", ""));
		res.json(false,"", "test created", newTest._id);
	})
};

exports.addModerator = function(req,res){
	var id = req.query._id; //moderator id
	userModel.findOne({_id:id}, function(err,docs){
		if(err) res.json(response(true,"No such moderator","",""));
		else{
			docs.moderators.push(id);
			docs.save(function(error){
				if(error) res.json(response(true, "error", "", ""));
				else res.json(false,"", "moderator added");
			});
		}
	});
};

exports.addQuestion = function(req,res){
	var id = req.query._id; //question id
	questionModel.findOne({_id:id}, function(err,docs){
		if(err) res.json(response(true,"no such quection present","",""));
		else{
			docs.questions.push({
				question: req.query._id,
				marks: req.query.marks,
				negMarks: req.query.neqMarks
			});
			docs.save(function(error){
				if(error) res.json(response(true, "error", "", ""));
				else res.json(false,"", "question added");
			});
		}
	});
};
