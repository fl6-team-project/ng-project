var express = require('express');
var router = express.Router();
var Teacher = require("../models/Teacher").Teacher;

var mongoose = require('mongoose');
var uri = "mongodb://localhost:27017/testDB";
// var teacherSchema = new mongoose.Schema({"id": Number, "firstName": String, "lastName": String,
//     "email": String, "lectures": Array, "projectGroup": String, "avatar": String, "aboutMe": String}, {collection: 'teachers'});
mongoose.createConnection(uri);
// var db = mongoose.connection;
// var Teacher = mongoose.model('Teacher', teacherSchema);

/* GET users listing. */
router.get('/api/teachers', function(req, res, next) {
    // res.send('respond with a resource');
    Teacher.find({}, function(err, teachers) {
        if (err) throw err;
        res.json(teachers);
    });
});

module.exports = router;
