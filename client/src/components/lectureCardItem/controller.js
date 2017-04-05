require('./style.scss');

function LectureCardItemController($state, popUpService, AuthService) {
  let self = this;

  AuthService.userRole().then(function (userRole) {
    self.role = userRole;
  });

  self.runEdit = function (lecture, $event) {
      console.log(self.role);
      $event.preventDefault();
      $state.go(self.role + '.editLecture', {lecture: lecture });
  };

  self.openPopUpClick = function(id){
    self.serv = 'feedback';
    popUpService.openPopUpClick(id);
  };

  self.openCheckHWPopUp = function(id){
    self.serv = 'homework';
    popUpService.openPopUpClick(id);
  }
}

LectureCardItemController.$inject = ['$state', 'popUpService', 'AuthService'];
module.exports = LectureCardItemController;
