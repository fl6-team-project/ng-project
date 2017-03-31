function lecturesListController($element, popUpService) {
  let self = this;
  self.$element = $element;

  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  };
}

lecturesListController.$inject = ['$element', 'popUpService'];

module.exports = lecturesListController;
