function LecturesListController($element, popUpService, $http, AuthService) {
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
  });
}

LecturesListController.$inject = ['$element', 'popUpService', '$http', 'AuthService'];

module.exports = LecturesListController;
