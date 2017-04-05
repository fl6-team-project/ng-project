require("./style.scss");

function AdminController($http, $state, AuthService, $rootScope, $element, adminProjServ) {
  let self = this;
  let scope = $rootScope.$new();
  self.$element = $element;
  if (AuthService.exists()) {
    let id = AuthService.getUser();
    let url = '/api/users/' + id;
    $http.get(url).then(function(res) {
      self.user = res.data;
    });

  } else {
    $state.go('login');
  }

  self.logout = function() {
    AuthService.logout();
    $state.go('login');

  };
  let getCousesHere = function() {
    $http.get('/api/courses').then(function(res) {
      self.courses = res.data;
    });
  }

  getCousesHere();

  scope.$on('getCouses', function(event) {
    getCousesHere();
  });

  jQuery('.collapsible').collapsible();

  self.sendCourseInfo = function(course) {
    // $rootScope.$broadcast('getCourseInfo', course);
    jQuery('.collapsible').collapsible('');
    adminProjServ.courseChecked = course;
    adminProjServ.updateDataAdmCourse();
  }
}
AdminController.$inject = ['$http', '$state', 'AuthService', '$rootScope', '$element', 'adminProjServ'];
module.exports = AdminController;
