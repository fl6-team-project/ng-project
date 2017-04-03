var mongoose = require("mongoose");

var HWFeedbackSchema = new mongoose.Schema({
    courseId: {
        type: String,
        index: true
    },
    lecturerName: {
        type: String,
        index: true
    },
    lectureId: {
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
    homeworks: {
        type: String,
        index: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'hw_feedbacks'});

var HomeworkFeedback = mongoose.model('HomeworkFeedback', HWFeedbackSchema);

module.exports = {
    HomeworkFeedback: HomeworkFeedback
};