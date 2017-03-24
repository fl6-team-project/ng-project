const lecturesListController = require("./states/student/lecturesList/controller.js");
const homeController = require("./states/student/home/controller.js");
const studentListComponent = require('./states/student/studentList/component');
const teacherListComponent = require('./states/student/teacherList/component');
const homeItemComponent = require('./states/student/home/component');
const lecturesListComponent = require('./states/student/lecturesList/component');

module.exports = function(app) {
  // We can register controller with angular first
  // Or use a controller as simple function
  app.controller('homeController', homeController);
  // We need to register component
  app.component('studentListComponent', studentListComponent);
  app.component('teacherListComponent', teacherListComponent);
  app.component('lecturesListComponent', lecturesListComponent);
  app.component('homeItemComponent', homeItemComponent);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

    /* USER STUDENT STATE */
    .state('student', {
      url: '/student',
      template: require('./states/student/index.html')
    })
    // now the controller and template included in component
    // and you should include here only component

    .state('student.home', {
      url: '/',
      component: 'homeItemComponent'
    })

    .state('student.lectures', {
      url: '/lectures',
      component: 'lecturesListComponent'
    })

    .state('student.students', {
      url: '/students',
      component: 'studentListComponent'
    })

    .state('student.teachers', {
      url: '/teachers',
      component: 'teacherListComponent'
    })

    .state('student.project', {
      url: '/project',
      template: 'project group would be here'
    })

    /* USER TEACHER STATE */
    .state('teacher', {
      url: '/teacher',
      template: 'hello from teacher page'
    })

    /* USER ADMIN STATE */
    .state('admin', {
      url: '/admin',
      template: 'hello from admin page'
    })

    $urlRouterProvider.otherwise('/');
  }]);

}
