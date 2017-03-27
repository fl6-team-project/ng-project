const studentListComponent = require('./states/student/studentList/component');
const teacherListComponent = require('./states/student/teacherList/component');
const homeItemComponent = require('./states/student/home/component');
const lecturesListComponent = require('./states/student/lecturesList/component');
const studentComponent = require('./states/student/component');
const projectComponent = require('./states/student/project/component');
const adminComponent = require('./states/admin/component');
const teacherComponent = require('./states/teacher/component');
const homeController = require("./states/main/controller.js");
const loginController = require('./states/auth/login/controller.js');
const registerController = require('./states/auth/register/controller.js');


module.exports = function(app) {
  // We need to register component

  app.component('studentListComponent', studentListComponent);
  app.component('teacherListComponent', teacherListComponent);
  app.component('lecturesListComponent', lecturesListComponent);
  app.component('homeItemComponent', homeItemComponent);
  app.component('studentComponent', studentComponent);
  app.component('projectComponent', projectComponent);
  app.component('adminComponent', adminComponent);
  app.component('teacherComponent', teacherComponent);

  app.controller('homeController', homeController);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('main', {
          url: '/',
          template: require('./states/main/template.html'),
          // controller as string - name of previously registered controller
          controller: 'homeController',
          controllerAs: '$ctrl'
        })
        .state('login', {
          url: '/login',
          template: require('./states/auth/login/template.html'),
          controller: loginController,
          controllerAs: 'login'
        })
        .state('register', {
          url: '/register',
          template: require('./states/auth/register/template.html'),
          controller: registerController,
          controllerAs: 'reg'
        })
    /* USER STUDENT STATE */
    .state('student', {
      url: '/student',
      component: 'studentComponent'
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
      component: 'projectComponent'
    })

    /* USER TEACHER STATE */
    .state('teacher', {
      url: '/teacher',
      component: 'teacherComponent'
    })

    /* USER ADMIN STATE */
    .state('admin', {
      url: '/admin',
      component: 'adminComponent'
    })

    $urlRouterProvider.otherwise('/');
  }]);

}
