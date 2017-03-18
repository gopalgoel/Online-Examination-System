var path = require('path');
var config = require(path.join(__dirname,'..','config','config'));
var response = require(path.join(__dirname,'..','config','response'));
var testModel = require(path.join(__dirname,'..','models','testSchema'));
var userModel = require(path.join(__dirname,'..','models','userSchema'));
var questionModel = require(path.join(__dirname,'..','models','questionSchema'));
var mongoose = require('mongoose');
exports.createTest = function(req,res){
	if(req.body!=null){
		var newTest = new testModel(req.body);
		newTest.save(function(err){
			if(err) res.json(response(true, err, "", ""));
			else res.json(response(false,"", "test created", newTest._id));
		});
	}
	else res.json(response(true, "Validation Error: Parameters not supplied", "", ""));
};
// {
//     "name": "test Test",
//     "description": "just trying out tests",
//     "type": "public",
//     "owner": "58c3945cbd9606388ad770fb",
//     "questions":[],
//     "marks": 4,
//     "timeDuration":60, 
//     "prize":"kucho nai",
//     "Requests": []
// }

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
	if(testId!=null){
		testModel.updateOne({_id:testId}, req.body, function(err){
			if(err) res.json(response(true,err,"",""));
			else res.json(response(false,"","updated",""));
		});
	}
	else res.json(response(true, "Validation Error: Parameters not supplied", "", ""));
};

exports.deleteTest = function(req,res){
	var testId = req.query.testId;
	if(testId!=null){
		testModel.deleteOne({_id:testId}, function(err){
			if(err) res.json(response(true,err,"",""));
			else res.json(response(false,"","deleted",""));
		});
	}
	else res.json(response(true, "Validation Error: Parameters not supplied", "", ""));	
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

exports.addQuestionToTest = function(req,res,next){
	var quesId = req.query.quesId;
	var testId = req.query.testId;
	//a very specialized type of query , doesnt return the _id field : use 1 to include
	//IT is IMPOSSIBLE to transform doc object , just thinking it as a JS object 
	//we need to apply special toObject() function with transform option to do that
	//http://stackoverflow.com/questions/29407567/mongoose-id-field-cant-be-deleted
	//use this to bypass for now
	if(quesId!=null && testId!=null){
		testModel.findOne({_id:testId},{_id:0},function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else if(docs==null)	res.json(response(true,"Test Not Found","",""));
			else{
				questionModel.findOne({_id:quesId}, function(err,qdocs){
					if(err) res.json(response(true,err,"",""));
					else if(qdocs==null) res.json(response(true,"Question Not Found","",""));
					else{
						docs.questions.push({question:quesId});
						req.body = docs;
						next();
					}
				});
			}
		});
	}
	else res.json(response(true,"Validation Error","",""));
};

exports.addRequest = function(req,res,next){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	if(testId!=null && userId!=null){
		testModel.findOne({_id:testId},{_id:0},function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else if(docs==null) res.json(response(true,"Test Not Found","",""));
			else{
				userModel.findOne({_id:userId}, function(err,udocs){
					if(err) res.json(response(true,err,"",""));
					else if(udocs==null) res.json(response(true,"User Not Found","",""));
					else{
						docs.requests.push({userId: userId});
						req.body = docs;
						next();
					}
				});
			}
		});
	}
	else res.json(response(true,"Validation Error : Parameters not supplied","",""));
};

exports.getRequest = function(req,res){
	var testId = req.query.testId;
	if(testId!=null){
		testModel.findOne({_id:testId}, function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else res.json(response(false,"","success",docs.requests));
	    });
	}
	else res.json(response(true,"Validation Error : Parameters not supplied","",""));
};

exports.acceptRequest = function(req,res,next){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	if(testId!=null && userId!=null){
		testModel.findOne({_id:testId},{_id:0},function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else if(docs==null) res.json(response(true,"Test Not Found","",""));
			else{
				userModel.findOne({_id:userId}, function(err,udocs){
					if(err) res.json(response(true,err,"",""));
					else if(udocs==null) res.json(response(true,"User Not Found","",""));
					else{
						for(var index = 0;index < docs.requests.length;index++){
							if(String(docs.requests[index].userId)===String(userId)){
								docs.requests[index].isAllowed = true;
								break;
							}
						}
						req.body = docs;
						next();
					}
				});
			}
		});
	}
	else res.json(response(true,"Validation Error : Parameters not supplied","",""));
};

exports.deleteRequest = function(req,res,next){
	var userId = req.query.userId; // userId of the person requesting permission
	var testId = req.query.testId;
	if(testId!=null && userId!=null){
		testModel.findOne({_id:testId},{_id:0},function(err,docs){
			if(err) res.json(response(true,err,"",""));
			else if(docs==null) res.json(response(true,"Test Not Found","",""));
			else{
				userModel.findOne({_id:userId}, function(err,udocs){
					if(err) res.json(response(true,err,"",""));
					else if(udocs==null) res.json(response(true,"User Not Found","",""));
					else{
						for(var index = 0;index < docs.requests.length;index++){
							if(String(docs.requests[index].userId)===String(userId)){
								break;
							}
						}
						if(index==docs.requests.length) res.json(response(true,"Request Not Found","",""));
						else{
							docs.requests.splice(index,1);
							req.body = docs;
							next();
						}
					}
				});
			}
		});
	}
	else res.json(response(true,"Validation Error : Parameters not supplied","",""));
};