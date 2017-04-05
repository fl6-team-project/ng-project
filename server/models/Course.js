var mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    startFrom: {
        type: String,
        index: true
    },
    studentsGroupId: {
        type: String,
        index: true
    }
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'courses'});

var Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Course: Course
};
