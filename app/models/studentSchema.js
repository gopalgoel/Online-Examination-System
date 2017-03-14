var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it

var studentSchema = new mongoose.Schema({
	userId: {type: mongoose.Schema.types.ObjectId, ref: 'user'},
    testsAvailable: {
    	public : [ {
        	testId: { type: mongoose.Schema.types.ObjectId, ref: 'test'},
        	completed: { type: Boolean, default: false},
        	score: {type: Number}
    	} ],
    	premium : [ {
	        testId: { type: mongoose.Schema.types.ObjectId, ref: 'test'},
	        completed: { type: Boolean, default: false},
	        score: {type: Number}
	    } ]
    }
});

var studentModel = mongoose.model('student', studentSchema);
module.exposts = studentModel;
