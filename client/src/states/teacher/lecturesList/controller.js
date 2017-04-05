function LecturesListController($element, popUpService, $http, AuthService, $filter) {
  let self = this;
  self.$element = $element;
  self.userId = AuthService.getUser();

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };

  $http.get('/api/lectures/showteacher').then(function(res) {
      self.lectures = res.data.sort(function (a, b) {
          return new Date(a.lectureScheduledDate).getTime() - new Date(b.lectureScheduledDate).getTime();
      });
      self.lecturesAll = self.lectures;
      self.lecturesPersonal = $filter('filter')(self.lectures, self.userId);
      self.lectureShow = self.lecturesPersonal;
  });
}

LecturesListController.$inject = ['$element', 'popUpService', '$http', 'AuthService', '$filter'];

module.exports = LecturesListController;
