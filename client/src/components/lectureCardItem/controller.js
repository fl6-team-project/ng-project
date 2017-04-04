require('./style.scss');

function LectureCardItemController(popUpService, AuthService) {
  let self = this;

  AuthService.userRole().then(function (userRole) {
    self.role = userRole;
  });

  self.openPopUpClick = function(id){
    self.serv = 'feedback';
    popUpService.openPopUpClick(id);
  }

  self.openCheckHWPopUp = function(id){
    self.serv = 'homework';
    popUpService.openPopUpClick(id);
  }
}

LectureCardItemController.$inject = ['popUpService', 'AuthService'];
module.exports = LectureCardItemController;
