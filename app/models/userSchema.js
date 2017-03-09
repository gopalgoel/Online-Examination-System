var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it 
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    role:String,//STUDENT,ADMIN,TEACHER
    email:String
});

//modelName maps to collections in plural
var userModel = mongoose.model("user",userSchema);

//Instance of a Model is a Document 
module.exports = userModel;