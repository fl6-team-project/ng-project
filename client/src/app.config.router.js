const lecturesListController = require("./states/student/lecturesList/controller.js");
const homeController = require("./states/student/home/controller.js");
const studentListComponent = require('./states/student/studentList/component.js');
const teacherListComponent = require('./states/student/teacherList/component.js');

module.exports = function(app) {
  // We can register controller with angular first
  // Or use a controller as simple function
  app.controller('homeController', homeController);
  // We need to register component
  app.component('studentListComponent', studentListComponent);
  app.component('teacherListComponent', teacherListComponent);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

    /* USER STUDENT STATE */
    .state('student', {
      url: '/student',
      template: require('./states/student/index.html')
    })
    // students state using component method
    // now the controller and template included in component
    // and you should include here only component

    .state('student.home', {
      url: '/',
      template: require('./states/student/home/template.html'),
      // controller as string - name of previously registered controller
      controller: 'homeController',
      controllerAs: '$ctrl'
    })

    .state('student.lectures', {
      url: '/lectures',
      template: require('./states/student/lecturesList/template.html'),
      controller: lecturesListController,
      controllerAs: '$ctrl'
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
