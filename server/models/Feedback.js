var mongoose = require("mongoose");

var FeedbackSchema = new mongoose.Schema({
    courseId: {
        type: String,
        index: true
    },
    lectureId: {
        type: String,
        index: true
    },
    studentName: {
        type: String,
        index: true
    },
    lecturerName: {
        type: String,
        index: true
    },
    theme: {
        type: String,
        index: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date
    },
    overal: {
        type: String,
        index: true
    },
    whatWasGood: {
        type: String,
        index: true
    },
    whatWasBad: {
        type: String,
        index: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'feedbacks'});

var Feedback = mongoose.model('Feedback', FeedbackSchema);

module.exports = {
    Feedback: Feedback
};