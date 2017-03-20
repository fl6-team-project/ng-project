var express = require('express');
var router = express.Router();
var Lecture = require("../models/Lecture").Lecture;

var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/testDB";
// var lectureSchema = new mongoose.Schema({"number": Number, "lectureName": String, "link": String, "teacherName": String,
//     "teacherEmail": String, "date": Date, "picture": String, "description": String}, {collection: 'lectures'});
mongoose.createConnection(uri);
// var db = mongoose.connection;
// var Lectures = mongoose.model('Lecture', lectureSchema);

/* GET users listing. */
router.get('/api/lectures', function(req, res, next) {
    // res.send('respond with a resource');
    Lecture.find({}, function(err, lectures) {
        if (err) throw err;
        res.json(lectures);
    });
});

module.exports = router;
