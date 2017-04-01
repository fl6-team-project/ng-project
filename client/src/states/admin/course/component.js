const CourseComponentController = require('./controller.js');

const adminCourseComponent = {
  bindings: {
    course: '='
  },
  template: require('./template.html'),
  controller: CourseComponentController
};

module.exports = adminCourseComponent;
