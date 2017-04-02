function lecturesListController($element, popUpService, $http) {
  let self = this;
  self.$element = $element;

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };

  $http.get('/api/lectures/showteacher').then(function(res) {
      self.lectures = res.data;
  });
}

lecturesListController.$inject = ['$element', 'popUpService', '$http'];

module.exports = lecturesListController;
