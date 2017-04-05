require('./style.scss');

function LecturesListController($state, $http, popUpService) {
  let self = this;
  self.runAdd = function() {
    $state.go('admin.addLecture');
  };

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };

  $http.get('/api/lectures/showteacher').then(function(res) {
    console.log(res.data);
      self.lectures = res.data.sort(function (a, b) {
          return new Date(a.lectureScheduledDate).getTime() - new Date(b.lectureScheduledDate).getTime();
      });
  });

}
LecturesListController.$inject = ['$state', '$http', 'popUpService'];

module.exports = LecturesListController;
