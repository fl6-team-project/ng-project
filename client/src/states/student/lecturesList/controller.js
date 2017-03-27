require("./style.scss");

function lecturesListController($http, $element, popUpService) {
  let self = this;
  self.$element = $element;
  $http.get('/api/lectures').then(function(res) {
    self.lectures = res.data;
  });

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  }

  jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');
}

lecturesListController.$inject = ['$http', '$element', 'popUpService'];

module.exports = lecturesListController;
