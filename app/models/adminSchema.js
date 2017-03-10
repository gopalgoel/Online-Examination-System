var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it
var baseSchema = require('./userSchema');

var userSchema = baseSchema.userSchema;
var adminSchema = new mongoose.Schema(userSchema);
adminSchema.add({
    //add more
});

var adminModel = mongoose.model('student', adminSchema);
module.exposts = adminModel;
