var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');//something about promises in MongoDB . Will have to read upon it

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['student', 'teacher'] }//STUDENT,ADMIN,TEACHER
});


// models middleware

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

// schema methods

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

//modelName maps to collections in plural
var userModel = mongoose.model("user",userSchema);

exports.schema = userSchema;
//Instance of a Model is a Document
module.exports = userModel;
