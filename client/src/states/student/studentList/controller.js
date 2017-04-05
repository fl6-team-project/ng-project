function StudentListController($http, AuthService) {
    let self = this;
    AuthService.userCourse().then(function(userCourse) {
      self.courseId = userCourse;
      let url = '/api/course/students/' + self.courseId;
      $http.get(url).then(function(res) {
          self.persons = res.data;
      });
    });
}
// This is an angular special property. One of the way to safely inject smth to controller function
StudentListController.$inject = ['$http', 'AuthService'];

module.exports = StudentListController;
