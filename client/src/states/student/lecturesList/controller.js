function lecturesListController($element, popUpService, $http, AuthService) {
  let self = this;
  self.$element = $element;

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };

  AuthService.userCourse().then(function(userCourse) {
    self.courseId = userCourse;
    let url = '/api/course/lectures/showteacher/' + self.courseId;
    $http.get(url).then(function(res) {
        self.lectures = res.data.sort(function (a, b) {
            return new Date(a.lectureScheduledDate).getTime() - new Date(b.lectureScheduledDate).getTime();
        });
    });
  });
}

lecturesListController.$inject = ['$element', 'popUpService', '$http', 'AuthService'];

module.exports = lecturesListController;
