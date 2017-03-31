require("./style.scss");

function AdminController($element, $http, $rootScope) {
  let self = this;
  self.$element = $element;
  jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');

  $http.get('/api/courses').then(function(res) {
    self.courses = res.data;
  });

  self.sendCourseInfo = function(course) {
    $rootScope.$broadcast('getCourseInfo', course);
  }
}

AdminController.$inject = ['$element', '$http', '$rootScope'];
module.exports = AdminController;
