const studentListComponent = require('./states/student/studentList/component');
const teacherListComponent = require('./states/student/teacherList/component');
const homeItemComponent = require('./states/student/home/component');
const studentLecturesListComponent = require('./states/student/lecturesList/component');
const studentComponent = require('./states/student/component');
const projectComponent = require('./states/student/project/component');
const editProfileComponent = require('./states/student/edit/component');
const adminComponent = require('./states/admin/component');
const teacherComponent = require('./states/teacher/component');
const editLectureComponent = require('./states/teacher/editLecture/component');
const teacherLectureListComponent = require('./states/teacher/lecturesList/component');
const loginComponent = require('./states/auth/login/loginComponent');
const registerComponent = require('./states/auth/register/registerComponent');

const adminCoursesComponent = require('./states/admin/courses/component');


module.exports = function(app) {

  app.component('studentListComponent', studentListComponent);
  app.component('teacherListComponent', teacherListComponent);
  app.component('studentLecturesListComponent', studentLecturesListComponent);
  app.component('homeItemComponent', homeItemComponent);
  app.component('studentComponent', studentComponent);
  app.component('projectComponent', projectComponent);
  app.component('adminComponent', adminComponent);
  app.component('teacherComponent', teacherComponent);
  app.component('editLectureComponent', editLectureComponent);
  app.component('teacherLectureListComponent', teacherLectureListComponent);
  app.component('loginComponent', loginComponent);
  app.component('registerComponent', registerComponent);
  app.component('editProfileComponent', editProfileComponent);
  app.component('adminCoursesComponent', adminCoursesComponent);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
        /* AUTH STATES */
        .state('login', {
            url: '/',
            component: 'loginComponent',
            data: {
                requireLogin: false
            }
        })
        .state('register', {
            url: '/register',
            component: 'registerComponent',
            data: {
                requireLogin: false
            }
        })
        /* USER STUDENT STATE */
        .state('student', {
            url: '/student',
            component: 'studentComponent',
            data: {
                requireLogin: false
            }
        })
        // now the controller and template included in component
        // and you should include here only component

        .state('student.home', {
            url: '/',
            component: 'homeItemComponent'
        })

        .state('student.lectures', {
          url: '/lectures',
          component: 'studentLecturesListComponent'
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

        .state('student.edit', {
            url: '/edit',
            component: 'editProfileComponent'
        })

        /* USER TEACHER STATE */
        .state('teacher', {
            url: '/teacher',
            component: 'teacherComponent',
            data: {
                requireLogin: false
            }
        })

        .state('teacher.editLecture', {
            url: '/edit-lecture',
            component: 'editLectureComponent',
            params: {
                lecture: null
            }
        })

        .state('teacher.lectures', {
            url: '/lectures',
            component: 'teacherLectureListComponent'
        })

        /* USER ADMIN STATE */
        .state('admin', {
            url: '/admin',
            component: 'adminComponent',
            data: {
                requireLogin: false
            }
        })

        // .state('admin.home', {
        //     url: '/',
        //     component: 'homeItemComponent'
        // })

        .state('admin.courses', {
            url: '/courses',
            component: 'adminCoursesComponent'
        });

        // .state('admin.lectures', {
        //   url: '/lectures',
        //   component: 'adminLecturesListComponent'
        // })

    $urlRouterProvider.otherwise('/');
  }]);

}
