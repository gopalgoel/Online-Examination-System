var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var questionModel = require(path.join(__dirname,'..','models','questionSchema'));

exports.createQuestion = function(req,res){
	var newQues = new questionModel({
		owner: req.query.userId,
		problemStatement: req.query.problemStatement,
		choices: req.query.choices,
		points: req.query.points,
		answer: req.query.answer,
		visibility: req.query.visibility
	})
	newQues.save(function(error){
		if(error) res.json(response(true, "error", "", ""));
		res.json(false,"", "question created", newQues._id);
	})
};

exports.updateQuestion = function(req,res){
	var id = req.query._id;
	questionModel.findOne({_id:id}, function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			docs.problemStatement = req.query.problemStatement,
			docs.choices = req.query.choices,
			docs.points = req.query.points,
			docs.answer = req.query.answer,
			docs.visibility = req.query.visibility
			docs.save(function(error){
				if(error) res.json(response(true, "error", "", ""));
				res.json(false,"", "question updated", docs._id);
			});
		}
	});
};