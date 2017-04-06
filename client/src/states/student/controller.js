function StudentController($http, $state, AuthService, $element) {
  let self = this;
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

  jQuery(self.$element[0].querySelector(".button-collapse")).sideNav();
}

StudentController.$inject = ['$http', '$state', 'AuthService', '$element'];
module.exports = StudentController;
