require('./style.scss');

function LecturesRowListController($http, $state, $timeout, popUpService) {
    let self = this;

    $timeout(function () {
        $('.collapsible').collapsible({
            accordion : true
        });
    });

    self.runEdit = function (lecture) {
        $state.go('teacher.editLecture', {lecture: lecture });
    };

    self.openPopUpClick = function(id){
      self.serv = 'feedback';
      let idLecture = '#fb'+id;
      popUpService.openPopUpClick(idLecture);
    }

    self.openCheckHWPopUp = function(id){
      self.serv = 'homework';
      let idLecture = '#hw'+id;
      popUpService.openPopUpClick(idLecture);
    }
}


LecturesRowListController.$inject = ['$http', '$state', '$timeout', 'popUpService'];

module.exports = LecturesRowListController;
