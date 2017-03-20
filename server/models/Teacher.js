var mongoose = require("mongoose");

var TeacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        index: true
    },
    lastName: {
        type: String,
        index: true
    },
    email: {
        type: String,
        index: true
    },
    gender: {
        type: String,
        index: true
    },
    age: {
        type: Number,
        index: true
    },
    avatar: {
        type: String,
        index: true
    },
    aboutMe: {
        type: String,
        index: true
    },
    lectures: {
        type: Array,
        index: true
    },
    active: Boolean
    // owner_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     index: true
    // }
}, {collection: 'teachers'});

var Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = {
    Teacher: Teacher
};