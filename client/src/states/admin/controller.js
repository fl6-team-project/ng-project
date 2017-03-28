function AdminController($element, $http) {
  let self = this;
  self.$element = $element;
  jQuery(self.$element[0].querySelector('.collapsible')).collapsible('open');

  $http.get('/api/courses').then(function(res) {
      self.courses = res.data;
      console.log(self.courses);
  });
}

AdminController.$inject = ['$element', '$http'];
module.exports = AdminController;
