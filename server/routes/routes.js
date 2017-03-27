var express = require('express');
var router = express.Router();
var Teacher = require("../models/Teacher").Teacher;
var Lecture = require("../models/Lecture").Lecture;
var Feedback = require("../models/Feedback").Feedback;
var User = require('../models/User').User;
var RecentTasks = require("../models/RecentTasks").RecentTasks;
var AuthError = require('../models/User').AuthError;
var HttpError = require('../error/index').HttpError;
var async = require('async');
var ObjectID = require('mongodb').ObjectID;



//Authentication API

router.route('/login')
    .post(function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.authorize(username, password, function (err, user) {
            if (err) {
                if (err instanceof AuthError) {
                    return next(new HttpError(403, err.message))
                } else {
                    return next(err);
                }
            } else {
                if (!user || user === 'undefined') {
                    return next()
                } else {
                    req.session.user.id = user._id || 123;
                    req.session.user.role = user.userRole;
                    res.send(req.session.user);
                }
            }
        });
    });


router.route('/register')
    .post(function (req, res, next) {
        var username = req.body.username,
            password = req.body.password,
            firstName = req.body.firstName,
            lastName = req.body.lastName,
            email = req.body.email;

        User.findOne({username: username}, function (err, user) {
            if (user) {
                res.json(username);
            } else {
                var user = new User({
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                });
                user.save(function (err) {
                    if (err) return next(err);
                    req.session.user.id = user._id;
                    req.session.user.role = user.userRole;
                    res.send(req.session.user);
                })
            }
        })
    });

router.route('/logout')
    .post(function (req, res) {
        req.session.destroy();
        res.redirect('/');
    });

//Students REST api
router.route('/users')
    .get(function(req, res, next) {
        // res.send('respond with a resource');
        User.find({}, function(err, students) {
            if (err) throw err;

            res.json(students);
        });
    })
    .post(function(req, res) {

        var student = new User();
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.email = req.body.email;

        student.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Student created!' });
        });

    });
//Single student api
router.route('/users/:id')
    .get(function(req, res, next) {
        checkForId(req.params.id, next);

        User.findById(req.params.id, function(err, student) {
            if (err)
                res.send(err);
            res.json(student);
        });
    })
    .put(function(req, res, next) {
        checkForId(req.params.id, next);

        User.findById(req.params.id, function(err, student) {
            if (err)
                res.send(err);

            student.firstName = req.body.firstName;
            student.lastName = req.body.lastName;
            student.email = req.body.email;
            student.gender = req.body.gender;
            student.age = req.body.age;
            student.avatar = req.body.avatar;
            student.aboutMe = req.body.aboutMe;
            student.active = req.body.active;

            student.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Student updated!' });
            });

        });
    })
    .delete(function(req, res, next) {
        checkForId(req.params.id, next);

        User.remove({
            _id: req.params.id
        }, function(err, student) {
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
    .get(function(req, res, next) {
        checkForId(req.params.id, next);

        Teacher.findById(req.params.id, function(err, teacher) {
            if (err)
                res.send(err);
            res.json(teacher);
        });
    })
    .put(function(req, res, next) {
        checkForId(req.params.id, next);

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
    .delete(function(req, res, next) {
        checkForId(req.params.id, next);

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
        lecture.img = req.body.theme;
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

router.route('/lectures/last')
  .get(function(req, res, next) {
    Lecture.find({}, function(err, lectures) {
      if (err) throw err;
      res.json(lectures);
    }).sort({
      $natural: -1
    }).limit(2);
  });

//Single lecture api
router.route('/lectures/:id')
    .get(function(req, res, next) {
        checkForId(req.params.id, next);

        Lecture.findById(req.params.id, function(err, lecture) {
            if (err)
                res.send(err);
            res.json(lecture);
        });
    })
    .put(function(req, res, next) {
        checkForId(req.params.id, next);

        Lecture.findById(req.params.id, function(err, lecture) {
            if (err)
                res.send(err);

            lecture.courseId = req.body.courseId;
            lecture.name = req.body.name;
            lecture.img = req.body.theme;
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
    .delete(function(req, res, next) {
        checkForId(req.params.id, next);

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
  .get(function(req, res) {
    Feedback.find({}, function(err, feedbacks) {
      if (err)
        res.send(err);
      res.json(feedbacks);
    });
  })

  .post(function(req, res) {
    var feedback = new Feedback();
    feedback.courseId = req.body.courseId;
    feedback.studentId = req.body.studentId;
    feedback.lectureId = req.body.lectureId;
    feedback.date = new Date();
    feedback.overal = req.body.overal;
    feedback.whatWasGood = req.body.whatWasGood;
    feedback.whatWasBad = req.body.whatWasBad;

    feedback.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Feedback created!'
      });
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
      feedback.studentId = req.body.studentName;
      feedback.lectureId = req.body.lecturerName;
      feedback.date = new Date();
      feedback.overal = req.body.overal;
      feedback.whatWasGood = req.body.whatWasGood;
      feedback.whatWasBad = req.body.whatWasBad;

      feedback.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Feedback updated!'
        });
      });

    });
  })
  .delete(function(req, res) {
    Feedback.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

// Recent tasks

router.route('/tasks/recent')
  .get(function(req, res, next) {
    RecentTasks.find({
      status: 'active'
    }, function(err, tasks) {
      if (err) throw err;
      res.json(tasks);
    });
  });

router.route('/tasks/closed')
  .get(function(req, res, next) {
    RecentTasks.find({
      status: 'done'
    }, function(err, tasks) {
      if (err) throw err;
      res.json(tasks);
    }).sort({
      $natural: -1
    }).limit(10);
  });

router.route('/tasks')
  .post(function(req, res, next) {

    var recenttasks = new RecentTasks();
    recenttasks.userId = req.body.studentId;
    recenttasks.status = req.body.status;
    recenttasks.text = req.body.text;

    recenttasks.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Task created!'
      });
    });

  });


router.route('/tasks/:id')
  .get(function(req, res) {
    RecentTasks.findById(req.params.id, function(err, recenttasks) {
      if (err)
        res.send(err);
      res.json(tasks);
    });
  })
  .put(function(req, res) {
    RecentTasks.findById(req.params.id, function(err, recenttasks) {
      if (err)
        res.send(err);

      recenttasks.userId = req.body.userId;
      recenttasks.status = req.body.status;
      recenttasks.date = new Date();
      recenttasks.text = req.body.text;

      recenttasks.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'recenttasks updated!'
        });
      });

    });
  })
  .delete(function(req, res) {
    RecentTasks.remove({
      _id: req.params.id
    }, function(err, user) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

module.exports = router;

// try-catch for ids inside requests
function checkForId(id, next) {

    try {
        var newId = new ObjectID(id);
    } catch (e) {
        return next(404);
    }

}
