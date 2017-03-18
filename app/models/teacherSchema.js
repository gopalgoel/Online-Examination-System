var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it

var teacherSchema = new mongoose.Schema({
    questions: [{
        type: mongoose.Schema.types.ObjectId
    }]

    tests: [ {
        testId: { type: mongoose.Schema.types.ObjectId, ref: 'test'}
    } ]
});

var teacherModel = mongoose.model('student', teacherSchema);
module.exposts = teacherModel;
