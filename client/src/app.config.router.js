const lecturesListController = require("./states/student/lecturesList/controller.js");
const homeController = require("./states/student/home/controller.js");
const personsListComponent = require('./states/student/studentList/component.js');

module.exports = function(app) {
  // We can register controller with angular first
  // Or use a controller as simple function
  app.controller('homeController', homeController);
  // We need to register component
  app.component('personsListComponent', personsListComponent);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

    /* STUDENT STATE */
    .state('student', {
        url: '/student',
        template: require('./states/student/index.html')
    })
    // students state using component method
    // now the controller and template included in component
    // and you should include here only component
    .state('student.students', {
      url: '/students',
      component: 'personsListComponent'
    })

    .state('student.lectures', {
      url: '/lectures',
      template: require('./states/student/lecturesList/template.html'),
      controller: lecturesListController,
      controllerAs: '$ctrl'
    })

    .state('student.home', {
      url: '/',
      template: require('./states/student/home/template.html'),
      // controller as string - name of previously registered controller
      controller: 'homeController',
      controllerAs: '$ctrl'
    })

    /* TEACHER STATE */
    .state('teacher', {
        url: '/teacher',
        template: 'hello from personal teacher page'
    })
    /* ADMIN STATE */
    .state('admin', {
        url: '/admin',
        template: 'hello from personal admin page'
    })

    $urlRouterProvider.otherwise('/');
  }]);

}
