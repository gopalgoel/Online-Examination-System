var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var testSchema = new mongoose.Schema({
    creationDate:{type: Date, default: Date.now},
    testDate:Date,
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, enum: ['public', 'premium'], required: true},
    owner:{  // creator of the test
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    questions:[{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'question' },
    }],
    marks: {type: Number, default: 4 },
    negMarks: {type: Number, default: -1}
    timeDuration:Number, //in minutes
    prize:String,
    Requests: [{ //request by students to get permission to give test
        userId: {type: mongoose.Schema.types.ObjectId, ref: 'user'},
        isAllowed: {type: Boolean, default: false}
    }]
});

var testModel = mongoose.model("test",testSchema);
module.exports = testModel;
