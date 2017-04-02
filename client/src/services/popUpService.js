function popUpService($rootScope) {
  let popUpService = {};
  let self = this;

  popUpService.openPopUpClick = function(id) {
    id = '#' + id;
    jQuery(document).ready(function() {
      jQuery('.modal').modal();
      jQuery(id).modal('open');
    });
  };
  return popUpService;
}

popUpService.$inject = ['$rootScope'];
module.exports = popUpService;
