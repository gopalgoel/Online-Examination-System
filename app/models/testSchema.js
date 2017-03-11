var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var testSchema = new mongoose.schema({
    creationDate:{type: Date, default: Date.now},
    testDate:Date,
    name: {type: String, required: true},
    owner:{  // creator of the test
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    moderators:[{ //zero or more moderators possible
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    questions:[{
        question: { type: Schema.Types.ObjectId, ref: 'question' },
        marks: {type: Number, default: 4 },
        negMarks: {type: Number, default: -1}
    }],
    timeDuration:Number, //in minutes
    prize:String
});

var testModel = mongoose.model("test",testSchema);
module.exports = testModel;
