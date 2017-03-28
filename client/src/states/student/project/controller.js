function ProjectController($http, $element) {
  let self = this;
  self.$element = $element;
  jQuery(self.$element[0].querySelector('ul.tabs')).tabs();
}

ProjectController.$inject = ['$http', '$element'];
module.exports = ProjectController;
