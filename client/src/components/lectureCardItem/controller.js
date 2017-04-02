require('./style.scss');

function LectureCardItemController(popUpService, $http) {
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

  $http.get('/api/teachers').then(function(res) {
      self.teachers = res.data;
      /*@todo in such way it can take request per very card*/
      self.getTeacher = function (teacherId) {
          return self.teachers.find(function (teacher) {
              return teacher._id === teacherId;
          })
      };
  });
}

LectureCardItemController.$inject = ['popUpService', '$http'];
module.exports = LectureCardItemController;
