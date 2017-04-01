function LecturesListController($element, popUpService, $http) {
  let self = this;
  self.$element = $element;

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };

  $http.get('/api/lectures').then(function(res) {
      self.lectures = res.data.sort(function (a, b) {
          return new Date(a.lectureScheduledDate).getTime() - new Date(b.lectureScheduledDate).getTime();
      });
  });
}

LecturesListController.$inject = ['$element', 'popUpService', '$http'];

module.exports = LecturesListController;
