var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var testSchema = new mongoose.schema({
	creationDate:Date,
	testDate:Date,
	owner:{  // creator of the test
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	moderators:[{ //zero or more moderators possible
		type: Schema.Types.ObjectId,
		ref: 'user'
	}],
	questions:[{  //one or more questions in a test 
		type: Schema.Types.ObjectId,
		ref: 'question'
	}],
	timeDuration:Number, //in minutes
	prize:String
});

var testModel = mongoose.model("test",testSchema);
module.exports = testModel;