var mongoose = require("mongoose");

var LectureSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    img: {
        type: String,
        index: true
    },
    lectureScheduledDate: {
        type: Date,
        index: true
    },
    lectureScheduledTime: {
        type: String,
        index: true
    },
    teacherId: {
        type: String,
        index: true
    },
    teacher:{
        type: Object,
        index: true
    },
    homeworkDeadline: {
        type: Date,
        index: true
    },
    assistants: {
        type: String,
        index: true
    },
    contentLecture: {
        type: String,
        index: true
    },
    contentPractice: {
        type: String,
        index: true
    },
    contentHomework: {
        type: String,
        index: true
    },
    active: {
        type: Boolean,
        default: true
    },
    courseId: {
      type: String,
      index: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'lectures'});

var Lecture = mongoose.model('Lecture', LectureSchema);

module.exports = {
    Lecture: Lecture
};
