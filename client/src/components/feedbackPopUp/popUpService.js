function popUpService($rootScope) {
  let popUpService = {};
  let self = this;

  popUpService.openPopUpClick = function(id){
    let idLecture = '#fb'+id;
    jQuery(idLecture).modal();
    jQuery(idLecture).modal('open');
  }
  return popUpService;
}

popUpService.$inject = ['$rootScope'];
module.exports = popUpService;
