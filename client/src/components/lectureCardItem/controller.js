require('./style.scss');

function LectureCardItemController(popUpService) {
  let self = this;
  self.openPopUpClick = function(id){
    self.serv = 'feedback';
    popUpService.openPopUpClick(id);
  }

  self.openCheckHWPopUp = function(id){
    self.serv = 'homework';
    popUpService.openPopUpClick(id);
  }
}

LectureCardItemController.$inject = ['popUpService'];
module.exports = LectureCardItemController;
