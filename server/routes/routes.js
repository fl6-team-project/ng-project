var express = require('express');
var router = express.Router();
var User = require("../models/User").User;
var Teacher = require("../models/Teacher").Teacher;
var Lecture = require("../models/Lecture").Lecture;
var Feedback = require("../models/Feedback").Feedback;

var mongoose = require('mongoose');
var uri = 'mongodb://admin:admin@ds135830.mlab.com:35830/epamportal';
mongoose.connect(uri);
var db = mongoose.connection;

// db.on('error', function (err) {
//     log.error('connection error:', err.message);
// });
// db.once('open', function callback () {
//     log.info("Connected to DB!");
// });

//Users REST api
router.route('/users')
    .get(function(req, res, next) {
    // res.send('respond with a resource');
    User.find({}, function(err, users) {
        if (err) throw err;
        res.json(users);
    });
})
    .post(function(req, res) {

        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;

        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    });
//Single user api
router.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
})
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);

            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.gender = req.body.gender;
            user.age = req.body.age;
            user.avatar = req.body.avatar;
            user.aboutMe = req.body.aboutMe;
            user.active = req.body.active;

            user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User updated!' });
        });

    });
})
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


//Teachers REST api
router.route('/teachers')
    .get(function(req, res, next) {
        Teacher.find({}, function(err, teachers) {
            if (err) throw err;
            res.json(teachers);
        });
    })
    .post(function(req, res) {

        var teacher = new Teacher();
        teacher.firstName = req.body.firstName;
        teacher.lastName = req.body.lastName;
        teacher.email = req.body.email;

        teacher.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Teacher created!' });
        });

    });
//Single teacher api
router.route('/teachers/:id')
    .get(function(req, res) {
        Teacher.findById(req.params.id, function(err, teacher) {
            if (err)
                res.send(err);
            res.json(teacher);
        });
    })
    .put(function(req, res) {
        Teacher.findById(req.params.id, function(err, teacher) {
            if (err)
                res.send(err);

            teacher.firstName = req.body.firstName;
            teacher.lastName = req.body.lastName;
            teacher.email = req.body.email;
            teacher.gender = req.body.gender;
            teacher.age = req.body.age;
            teacher.avatar = req.body.avatar;
            teacher.aboutMe = req.body.aboutMe;
            teacher.lectures = req.body.lectures;
            teacher.active = req.body.active;

            teacher.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Teacher updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Teacher.remove({
            _id: req.params.id
        }, function(err, teacher) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


//Lectures REST api
router.route('/lectures')
    .get(function(req, res, next) {
        Lecture.find({}, function(err, lectures) {
            if (err) throw err;
            res.json(lectures);
        });
    })
    .post(function(req, res) {

        var lecture = new Lecture();
        lecture.theme = req.body.theme;
        lecture.lectorName = req.body.lectorName;
        lecture.contentLecture = req.body.contentLecture;
        lecture.contentPractice = req.body.contentPractice;
        lecture.contentHomework = req.body.contentHomework;

        lecture.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Lecture created!' });
        });

    });
//Single lecture api
router.route('/lectures/:id')
    .get(function(req, res) {
        Lecture.findById(req.params.id, function(err, lecture) {
            if (err)
                res.send(err);
            res.json(lecture);
        });
    })
    .put(function(req, res) {
        Lecture.findById(req.params.id, function(err, lecture) {
            if (err)
                res.send(err);

            lecture.courseId = req.body.courseId;
            lecture.name = req.body.name;
            lecture.theme = req.body.theme;
            lecture.lectureScheduledDate = req.body.lectureScheduledDate;
            lecture.lectureScheduledTime = req.body.lectureScheduledTime;
            lecture.lectorName = req.body.lectorName;
            lecture.homeworkDeadline = req.body.homeworkDeadline;
            lecture.assistants = req.body.assistants;
            lecture.contentLecture = req.body.contentLecture;
            lecture.contentPractice = req.body.contentPractice;
            lecture.contentHomework = req.body.contentHomework;
            lecture.active = req.body.active;

            lecture.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Lecture updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Lecture.remove({
            _id: req.params.id
        }, function(err, lecture) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

//Feedback REST api

router.route('/feedbacks')
    .get(function(req, res, next) {
        Feedback.find({}, function(err, feedbacks) {
            if (err) throw err;
            res.json(feedbacks);
        });
    })
    .post(function(req, res) {

        var feedback = new Feedback();
        feedback.courseId = req.body.courseId;
        feedback.studentName = req.body.studentName;
        feedback.lecturerName = req.body.lecturerName;
        feedback.theme = req.body.theme;
        feedback.overal = req.body.overal;
        feedback.whatWasGood = req.body.whatWasGood;
        feedback.whatWasBad = req.body.whatWasBad;

        feedback.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Feedback created!' });
        });

    });
//Single feedback api
router.route('/feedback/:id')
    .get(function(req, res) {
        Feedback.findById(req.params.id, function(err, feedback) {
            if (err)
                res.send(err);
            res.json(feedback);
        });
    })
    .put(function(req, res) {
        Feedback.findById(req.params.id, function(err, feedback) {
            if (err)
                res.send(err);

            feedback.courseId = req.body.courseId;
            feedback.studentName = req.body.studentName;
            feedback.lecturerName = req.body.lecturerName;
            feedback.theme = req.body.theme;
            feedback.updateDate = new Date();
            feedback.overal = req.body.overal;
            feedback.whatWasGood = req.body.whatWasGood;
            feedback.whatWasBad = req.body.whatWasBad;

            feedback.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Feedback updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Feedback.remove({
            _id: req.params.id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;