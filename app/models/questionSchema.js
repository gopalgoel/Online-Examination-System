var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


//Multiple choice question
var questionSchema = new mongoose.Schema({
    creationDate:{ type:Date, default: Date.now},
    owner:{  // creator of the test
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    problemStatement: { type: String, required: true},
    choices: {
        type: [{    //zero or more choices
            type:String //choice text
        }],
        validate: [function(arr){return arr.length==4}, "{PATH} must be excatly 4"],
        required: true
    },
    points: { type:Number, required: true},// marks obtained on correctly solving the problem
    answer: { type:Number, min: 1, max: 4 , required: true}, //choice number
    visibility: {type: String, enum:['public', 'private'], default: 'public'}
});

var questionModel = mongoose.model("question",questionSchema);
module.exports = questionModel;
