var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var testModel = require(path.join(__dirname,'..','models','testSchema'));
var userModel = require(path.join(__dirname,'..','models','userSchema'));
var questionModel = require(path.join(__dirname,'..','models','questionSchema'));

exports.createTest = function(req,res){
	var newTest = new testModel(req.body);
	newQues.save(function(error){
		if(error) res.json(response(true, "error", "", ""));
		res.json(response(false,"", "test created", newTest._id));
	})
};

exports.getTest = function(req,res){
	var testId = req.query.testId;
	if(testId==null){
		testModel.find({}, function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else res.json(response(false,"","success",docs));
		});
	}
	else{
		testModel.findOne({_id:testId}, function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else{
				res.json(response(false,"","success",docs));
			}
		});
	}
};

exports.updateTest = function(req,res){
	var testId = req.query.testId;
	testModel.updateOne({_id:testId}, req.body, function(err){
		if(err) res.json(response(true,err,"",""));
		else res.json(response(false,"","updated",docs));
	});
};

exports.deleteTest = function(req,res){
	var testId = req.query.testId;
	testModel.deleteOne({_id:testId}, function(err){
		if(err) res.json(response(true,err,"",""));
		else res.json(response(false,"","deleted",docs));
	});
};

// exports.addModerator = function(req,res){
// 	var id = req.query._id; //moderator id
// 	userModel.findOne({_id:id}, function(err,docs){
// 		if(err) res.json(response(true,"No such moderator","",""));
// 		else{
// 			docs.moderators.push(id);
// 			docs.save(function(error){
// 				if(error) res.json(response(true, "error", "", ""));
// 				else res.json(response(false,"", "moderator added"));
// 			});
// 		}
// 	});
// };

exports.addQuestionToTest = function(req,res){
	var quesId = req.query.quesId;
	var testId = req.query.testId;
	testModel.findOne({_id:testId},function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			var testMod = docs;
			questionModel.findOne({_id:quesId}, function(err,docs){
				if(err) res.json(response(true,err,"",""));
				else{
					testMod.questions.push(quesId);
					req.body = testMod;
					updateTest(req,res);
				}
			});
		}
	});
};

exports.addRequest = function(req,res){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	testModel.findOne({_id:testId}, function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			var testMod = docs;
			userModel.findOne({_id:userId}, function(err,docs){
				if(err) res.json(response(true,err,"",""));
				else{
					testMod.requests.push({"userId": userId});
					req.body = testMod;
					updateTest(req,res);
				}
			});
		}
	});
};

exports.getRequest = function(req,res){
	var testId = req.query.testId;
	testModel.findOne({_id:testId}, function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			req.json(response(false,"","success",docs.requests));
		}
	});
};

exports.acceptRequest = function(req,res){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	testModel.findOne({_id:testId}, function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			var testMod = docs;
			userModel.findOne({_id:userId}, function(err,docs){
				if(err) res.json(response(true,err,"",""));
				else{
					var index = testMod.requests.indexOf({"userId": userId, "isAllowed": false});
					testMod.requests[index] = {"userId": userId, "isAllowed": true};
					req.body = testMod;
					updateTest(req,res);
				}
			});
		}
	});
};

exports.deleteRequest = function(req,res){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	testModel.findOne({_id:testId}, function(err,docs){
		if(err) res.json(response(true,err,"",""));
		else{
			var testMod = docs;
			userModel.findOne({_id:userId}, function(err,docs){
				if(err) res.json(response(true,err,"",""));
				else{
					var index = testMod.requests.indexOf({"userId": userId, "isAllowed": false});
					if(index>-1) testMod.requests.splice(index,1);
					req.body = testMod;
					updateTest(req,res);
				}
			});
		}
	});
};