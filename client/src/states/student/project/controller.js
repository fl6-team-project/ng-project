function ProjectController($http, $element, $scope, $rootScope, AuthService) {
  let self = this;
  self.$element = $element;
  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
  let id = AuthService.getUser();
  let url = '/api/users/' + id;
  $http.get(url).then(function (res) {
      self.user = res.data;
      let url = '/api/project/team/' + self.user.groupProjectId;
      $http.get(url).then(function(res) {
        self.project = res.data;
        $rootScope.$broadcast('getProject', self.project);
      });
  });

}

ProjectController.$inject = ['$http', '$element', '$scope', '$rootScope', 'AuthService'];
module.exports = ProjectController;
