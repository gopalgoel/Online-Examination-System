var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


//Multiple choice question
var questionSchema = new mongoose.schema({
	creationDate:Date,
	owner:{  // creator of the test
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	problemStatement:String,
	choices:[{	//zero or more choices
		text:String	//choice text
	}],
	points:Number, // marks obtained on correctly solving the problem
	answer:Number //choice number
});

var questionModel = mongoose.model("question",questionSchema);
module.exports = questionModel;