function StudentController($http, $rootScope) {
  let self = this;
  let id = '58da511b462e204c9caafdb8';
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
      self.user = res.data;
      $rootScope.$broadcast('setData', self.user);
  });
}

StudentController.$inject = ['$http', '$rootScope'];
module.exports = StudentController;
