require("./style.scss");
function AdminController($http, $state, AuthService, $rootScope, $element) {
    let self = this;
    self.$element = $element;
    jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');
    if (AuthService.exists()) {
        let id = AuthService.getUser();
        let url = '/api/users/' + id;
        $http.get(url).then(function (res) {
            self.user = res.data;
        });

    } else {
        $state.go('login');
    }

    self.logout = function () {
        AuthService.logout();
        $state.go('login');

    };
    $http.get('/api/courses').then(function(res) {
      self.courses = res.data;
    });

    self.sendCourseInfo = function(course) {
      $rootScope.$broadcast('getCourseInfo', course);
    }
}
AdminController.$inject = ['$http', '$state', 'AuthService', '$rootScope', '$element'];
module.exports = AdminController;
