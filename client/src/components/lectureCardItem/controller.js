require('./style.scss');

function LectureCardItemController(popUpService) {
  let self = this;
  self.openPopUpClick = function(id){
    popUpService.openPopUpClick(id);
  }
}

LectureCardItemController.$inject = ['popUpService'];
module.exports = LectureCardItemController;
