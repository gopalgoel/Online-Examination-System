var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it
var baseSchema = require('./userSchema');

var userSchema = baseSchema.userSchema;
var teacherSchema = new mongoose.Schema(userSchema);
teacherSchema.add({
    tests: [ {
        testId: { type: Schema.types.ObjectId, ref: 'test'},
        role: { type: String, enum: ['owner','moderator']}
    } ]
});

var teacherModel = mongoose.model('student', teacherSchema);
module.exposts = teacherModel;
