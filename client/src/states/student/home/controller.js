require('./style.scss');

function HomeTeacherController($http, $element, AuthService) {
  let self = this;
  self.$element = $element;
  let id = AuthService.getUser();
  let url = '/api/users/' + id;
  $http.get(url).then(function(res) {
    self.role = res.data.userRole;
  });

  AuthService.userCourse().then(function(userCourse) {
    let url = '/api/course/lectures/showteacher/last/' + userCourse;
    $http.get(url).then(function(res) {
      console.log(res.data);
      self.lectures = res.data;
    });
  });
  //
  // $http.get('/api/lectures/showteacher/last').then(function (res) {
  //     self.lectures = res.data;
  // });


  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

HomeTeacherController.$inject = ['$http', '$element', 'AuthService'];

module.exports = HomeTeacherController;
