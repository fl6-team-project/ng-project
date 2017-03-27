require("./style.scss");

function lecturesListController($http, $element) {
  let self = this;
  self.$element = $element;
  $http.get('/api/lectures').then(function(res) {
    self.lectures = res.data;
  });

  // self.openPopUpClick = function(id){
  //   let idLecture = '#fb'+id;
  //   console.log(idLecture);
  //   jQuery(self.$element[0].querySelector(idLecture)).modal();
  //   jQuery(self.$element[0].querySelector(idLecture)).modal('open');
  // }

  jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');
}

lecturesListController.$inject = ['$http', '$element'];

module.exports = lecturesListController;
