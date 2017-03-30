const studentListComponent = require('./states/student/studentList/component');
const teacherListComponent = require('./states/student/teacherList/component');
const homeItemComponent = require('./states/student/home/component');
const studentLecturesListComponent = require('./states/student/lecturesList/component');
const studentComponent = require('./states/student/component');
const projectComponent = require('./states/student/project/component');
const editComponent = require('./states/student/edit/component');
const adminComponent = require('./states/admin/component');
const teacherComponent = require('./states/teacher/component');
const editLectureComponent = require('./states/teacher/editLecture/component');
const teacherLectureListComponent = require('./states/teacher/lecturesList/component');
const loginComponent = require('./states/auth/login/loginComponent');
const registerComponent = require('./states/auth/register/registerComponent');
const adminEditLectureComponent = require('./states/admin/editLecture/component');
const addLectureComponent = require('./states/admin/addLecture/component');
const addUserComponent = require('./states/admin/addUser/component');


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
  app.component('addLectureComponent', addLectureComponent);
  app.component('adminEditLectureComponent', adminEditLectureComponent);
  app.component('addUserComponent', addUserComponent);
  app.component('editComponent', editComponent);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
        /* AUTH STATES */
        .state('login', {
            url: '/',
            component: 'loginComponent'
        })
        .state('register', {
            url: '/register',
            component: 'registerComponent'
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
            component: 'editComponent'
        })

        /* USER TEACHER STATE */
        .state('teacher', {
            url: '/teacher',
            component: 'teacherComponent'
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

        .state('admin.editLecture', {
            url: '/edit-lecture',
            component: 'editLectureComponent',
            params: {
                lecture: null
            }
        })

        .state('admin.addLecture', {
            url: '/add-lecture',
            component: 'addLectureComponent',
            params: {
                lecture: null
            }
        })

        .state('admin.addUser', {
            url: '/add-user',
            component: 'addUserComponent',
        });

    $urlRouterProvider.otherwise('/');
  }]);

}
