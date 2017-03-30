function StudentController($http) {
  let self = this;
  let id = '58da511b462e204c9caafdb8';
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
      self.user = res.data;
      console.log(self.user);
  });
}

StudentController.$inject = ['$http'];
module.exports = StudentController;
