require("./style.scss");

function lecturesListController($http, $element) {
  let self = this;
  self.$element = $element;
  $http.get('/api/lectures').then(function(res) {
    self.lectures = res.data;
  });
  // console.log(jQuery(self.$element[0].querySelector('.collapsible')));
  jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');
}

lecturesListController.$inject = ['$http', '$element'];

module.exports = lecturesListController;
