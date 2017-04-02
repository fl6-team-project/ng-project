require('./style.scss');

function LectureCardItemController(popUpService) {
  let self = this;
  self.openPopUpClick = function(id){
    self.serv = 'feedback';
    let idLecture = '#fb'+id;
    popUpService.openPopUpClick(idLecture);
  };

  self.openCheckHWPopUp = function(id){
    self.serv = 'homework';
    let idLecture = '#hw'+id;
    popUpService.openPopUpClick(idLecture);
  };
}

LectureCardItemController.$inject = ['popUpService'];
module.exports = LectureCardItemController;
