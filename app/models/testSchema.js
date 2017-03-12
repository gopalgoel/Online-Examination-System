var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var testSchema = new mongoose.Schema({
    creationDate:{type: Date, default: Date.now},
    testDate:Date,
    name: {type: String, required: true},
    owner:{  // creator of the test
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    moderators:[{ //zero or more moderators possible
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    questions:[{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
        marks: {type: Number, default: 4 },
        negMarks: {type: Number, default: -1}
    }],
    timeDuration:Number, //in minutes
    prize:String
});

var testModel = mongoose.model("test",testSchema);
module.exports = testModel;
