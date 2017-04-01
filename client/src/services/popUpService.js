function popUpService($rootScope) {
  let popUpService = {};
  let self = this;

  popUpService.openPopUpClick = function(id){
    jQuery(id).modal();
    jQuery(id).modal('open');
  }
  return popUpService;
}

popUpService.$inject = ['$rootScope'];
module.exports = popUpService;
