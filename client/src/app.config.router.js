const studentListComponent = require('./states/student/studentList/component');
const teacherListComponent = require('./states/student/teacherList/component');
const homeItemComponent = require('./states/student/home/component');
const lecturesListComponent = require('./states/student/lecturesList/component');
const studentComponent = require('./states/student/component');
const projectComponent = require('./states/student/project/component');
const adminComponent = require('./states/admin/component');
const teacherComponent = require('./states/teacher/component');


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

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider

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
