var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it
var baseSchema = require('./userSchema');

var userSchema = baseSchema.userSchema;
var studentSchema = new mongoose.Schema(userSchema);
studentSchema.add({
    testsAvailable: [ {
        testId: { type: Schema.types.ObjectId, ref: 'test'},
        completed: { type: Boolean, default: false},
    } ]
});

var studentModel = mongoose.model('student', studentSchema);
module.exposts = studentModel;
