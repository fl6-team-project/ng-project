var express = require('express');
var router = express.Router();
var User = require("../models/User").User;
var Teacher = require("../models/Teacher").Teacher;
var Lecture = require("../models/Lecture").Lecture;

var mongoose = require('mongoose');
var uri = 'mongodb://admin:admin@ds135830.mlab.com:35830/epamportal';
mongoose.connect(uri);
var db = mongoose.connection;

router.get('/users', function(req, res, next) {
    // res.send('respond with a resource');
    User.find({}, function(err, users) {
        if (err) throw err;
        res.json(users);
    });
});

router.get('/teachers', function(req, res, next) {
    // res.send('respond with a resource');
    Teacher.find({}, function(err, teachers) {
        if (err) throw err;
        res.json(teachers);
    });
});

router.get('/lectures', function(req, res, next) {
    // res.send('respond with a resource');
    Lecture.find({}, function(err, lectures) {
        if (err) throw err;
        res.json(lectures);
    });
});

module.exports = router;