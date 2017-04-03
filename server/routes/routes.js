var express = require('express');
var router = express.Router();
var Lecture = require("../models/Lecture").Lecture;
var Feedback = require("../models/Feedback").Feedback;
var HomeworkFeedback = require("../models/HomeworkFeedback").HomeworkFeedback;
var User = require('../models/User').User;
var RecentTasks = require("../models/RecentTasks").RecentTasks;
var Project = require("../models/Project").Project;
var Course = require("../models/Course").Course;
var AuthError = require('../models/User').AuthError;
var HttpError = require('../error/index').HttpError;
var async = require('async');
var ObjectID = require('mongodb').ObjectID;

//Authentication API

router.route('/login')
  .post(function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.authorize(username, password, function(err, user) {
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
          req.session.user = {};
          req.session.user.id = user._id;
          req.session.user.role = user.userRole;
          res.send(req.session.user);
        }
      }
    });
  });


router.route('/register')
  .post(function(req, res, next) {
    var username = req.body.username,
      password = req.body.password,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email;

    User.findOne({
      username: username
    }, function(err, user) {
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
        user.save(function(err) {
          if (err) return next(err);
          req.session.user = {};
          req.session.user.id = user._id;
          req.session.user.role = user.userRole;
          res.send(req.session.user);
        })
      }
    })
  });

router.route('/logout')
  .post(function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });

//All users API for admin:
router.route('/users/all')
  .get(function(req, res, next) {
    // res.send('respond with a resource');
    var query = User.find({});
    query.exec(function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  });

//Students REST api
router.route('/users')
  .get(function(req, res, next) {
    // res.send('respond with a resource');
    var query = User.find({
      'userRole': 'student'
    });
    query.exec(function(err, students) {
      if (err) throw err;
      res.json(students);
    });
  })
  .post(function(req, res) {

    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = 'password';
    user.active = 'active';
    user.username = req.body.username;
    user.userRole = req.body.userRole;

    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'User created!'
      });
    });
  });
router.route('/course/students/:course')
  .get(function(req, res, next) {
    // res.send('respond with a resource');
    var query = User.find({
      'userRole': 'student',
      'courseId': req.params.course
    });
    query.exec(function(err, students) {
      if (err) throw err;
      res.json(students);
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
  .put(function(req, res) {
    // checkForId(req.params.id, next);

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
      student.username = req.body.username;
      student.password = req.body.password;
      student.active = req.body.active;
      student.userRole = 'student';

      student.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Student updated!'
        });
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

      res.json({
        message: 'Successfully deleted'
      });
    });
  });


//Teachers REST api
router.route('/teachers')
  .get(function(req, res, next) {
    var query = User.find({
      'userRole': 'teacher'
    });

    query.exec(function(err, teachers) {
      if (err) throw err;
      res.json(teachers);
    });
  })
  .post(function(req, res) {

    var teacher = new User();
    teacher.username = req.body.username;
    teacher.password = 'teacher_tmp';
    teacher.firstName = req.body.firstName;
    teacher.lastName = req.body.lastName;
    teacher.email = req.body.email;
    teacher.userRole = 'teacher';

    teacher.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Teacher created!'
      });
    });

  });
//Single teacher api
router.route('/teachers/:id')
  .get(function(req, res, next) {
    checkForId(req.params.id, next);

    User.findById(req.params.id, function(err, teacher) {
      if (err)
        res.send(err);
      res.json(teacher);
    });
  })
  .put(function(req, res, next) {
    checkForId(req.params.id, next);

    User.findById(req.params.id, function(err, teacher) {
      if (err)
        res.send(err);

      teacher.username = req.body.username;
      teacher.password = req.body.password;
      teacher.firstName = req.body.firstName;
      teacher.lastName = req.body.lastName;
      teacher.email = req.body.email;
      teacher.gender = req.body.gender;
      teacher.age = req.body.age;
      teacher.avatar = req.body.avatar;
      teacher.aboutMe = req.body.aboutMe;
      teacher.lectures = req.body.lectures;
      teacher.active = req.body.active;
      teacher.userRole = 'teacher';

      teacher.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Teacher updated!'
        });
      });

    });
  })
  .delete(function(req, res, next) {
    checkForId(req.params.id, next);

    User.remove({
      _id: req.params.id
    }, function(err, teacher) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
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
    lecture.name = req.body.name;
    lecture.img = req.body.img;
    lecture.lectureScheduledDate = req.body.lectureScheduledDate;
    lecture.lectureScheduledTime = req.body.lectureScheduledTime;
    lecture.teacherId = req.body.teacherId;
    lecture.homeworkDeadline = req.body.homeworkDeadline;
    lecture.assistants = req.body.assistants;
    lecture.contentLecture = req.body.contentLecture;
    lecture.contentPractice = req.body.contentPractice;
    lecture.contentHomework = req.body.contentHomework;
    lecture.active = req.body.active;
    lecture.courseId = "";

    lecture.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Lecture created!'
      });
    });

  });

// api to get lectures with teacher info object
router.route('/lectures/showteacher')
    .get(function(req, res, next) {
        Promise.all([
            Lecture.find({}).exec(),
            User.find({}).exec()
        ]).then(function(results) {
            let lectures = results[0],
                teachers = results[1];

            lectures.forEach(function (lecture) {
                teachers.forEach(function (teacher) {

                    if (lecture.teacherId == teacher._id){
                        lecture.teacherId = '';
                        lecture.teacher = {
                            'firstName': teacher.firstName,
                            'lastName': teacher.lastName,
                            'email': teacher.email
                        };
                    }
                });
            });
            res.json(lectures);
        }).catch(function(err) {
            res.send(err);
        });
    });

// api to show 2 last lectures
router.route('/lectures/showteacher/last')
  .get(function(req, res, next) {
    let curDate = new Date();
      Promise.all([
          Lecture.find({"lectureScheduledDate":{$lt: curDate}}).sort({
                "lectureScheduledDate":-1}).limit(2).exec(),
          User.find({}).exec()
      ]).then(function(results) {
          let lectures = results[0],
              teachers = results[1];

          // set teacher values to lecture
          lectures.forEach(function (lecture) {
              teachers.forEach(function (teacher) {

                  if (lecture.teacherId == teacher._id){
                      lecture.teacherId = '';
                      lecture.teacher = {
                          'firstName': teacher.firstName,
                          'lastName': teacher.lastName,
                          'email': teacher.email
                      };
                  }
              });
          });
          res.json(lectures);
      }).catch(function(err) {
          res.send(err);
      });
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
      lecture.img = req.body.img;
      lecture.lectureScheduledDate = req.body.lectureScheduledDate;
      lecture.lectureScheduledTime = req.body.lectureScheduledTime;
      lecture.teacherId = req.body.teacherId;
      lecture.homeworkDeadline = req.body.homeworkDeadline;
      lecture.assistants = req.body.assistants;
      lecture.contentLecture = req.body.contentLecture;
      lecture.contentPractice = req.body.contentPractice;
      lecture.contentHomework = req.body.contentHomework;
      lecture.active = req.body.active;

      lecture.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Lecture updated!'
        });
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

      res.json({
        message: 'Successfully deleted'
      });
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

//Homework Feedback REST api

router.route('/feedbacks/homework')
  .get(function(req, res) {
    HomeworkFeedback.find({}, function(err, feedbacks) {
      if (err)
        res.send(err);
      res.json(feedbacks);
    });
  })

.post(function(req, res) {
  var hwFeedback = new HomeworkFeedback();
  hwFeedback.courseId = req.body.courseId;
  hwFeedback.lectureId = req.body.lectureId;
  hwFeedback.date = new Date();
  hwFeedback.homeworks = req.body.homeworks;

  hwFeedback.save(function(err) {
    if (err)
      res.send(err);

    res.json({
      message: 'Homework Feedback created!'
    });
  });

});

// Get Feedback about particular lecture:

router.route('/feedbacks/homework/:id')
    .get(function(req, res) {
        HomeworkFeedback.find({lectureId: id}, function(err, feedbacks) {
            if (err)
                res.send(err);
            res.json(feedbacks);
        });
    });

// Recent tasks

router.route('/tasks/recent/:id')
  .get(function(req, res, next) {

    RecentTasks.find({
      status: 'active',
      userId: req.params.id
    }, function(err, tasks) {
      if (err) throw err;
      res.json(tasks);
    });
  });

router.route('/tasks/closed/:id')
  .get(function(req, res, next) {
    RecentTasks.find({
      status: 'done',
      userId: req.params.id
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
      res.json(recenttasks);
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

router.route('/course/projects')
  .get(function(req, res) {
    Project.find({}, function(err, projects) {
      if (err)
        res.send(err);
      res.json(projects);
    });
  })
  .post(function(req, res, next) {

    var projects = new Project();
    project.lead = req.body.lead;
    project.students = req.body.students;
    project.name = req.body.name;
    project.description = req.body.description;
    project.technologies = req.body.technologies;
    project.courseId = req.body.courseId;

    projects.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Project created!'
      });
    });

  });

router.route('/project/team/:id')
  .get(function(req, res) {
    Project.findById(req.params.id, function(err, team) {
      if (err)
        res.send(err);
      res.json(team);
    });
  })
  .put(function(req, res) {
    Project.findById(req.params.id, function(err, project) {
      if (err)
        res.send(err);

      project.lead = req.body.lead;
      project.students = req.body.students;
      project.name = req.body.name;
      project.description = req.body.description;
      project.technologies = req.body.technologies;
      project.courseId = req.body.courseId;

      project.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'project updated!'
        });
      });

    });
  })
  .delete(function(req, res) {
    Project.remove({
      _id: req.params.id
    }, function(err, project) {
      if (err)
        res.send(err);

      res.json({
        message: 'Successfully deleted'
      });
    });
  });

router.route('/courses')
  .get(function(req, res) {
    Course.find({}, function(err, courses) {
      if (err)
        res.send(err);
      res.json(courses);
    });
  })
  .post(function(req, res, next) {

    var course = new Course();
    course.name = req.body.name;
    course.startFrom = req.body.startFrom;
    course.studentsGroupId = 0;
    course.lectures = [];

    course.save(function(err) {
      if (err)
        res.send(err);

      res.json({
        message: 'Course created!'
      });
    });
  });

router.route('/courses/:id')
  .get(function(req, res) {
    Course.findById(req.params.id, function(err, team) {
      if (err)
        res.send(err);
      res.json(team);
    });
  })
  .delete(function(req, res) {
    Course.remove({
      _id: req.params.id
    }, function(err, course) {
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
