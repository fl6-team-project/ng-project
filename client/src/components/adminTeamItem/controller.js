function adminTeamItemController($http, $rootScope, $scope, $element, adminProjServ) {
  let scope = $rootScope.$new();
  let self = this;
  self.studentsInfo = [];
  self.getLeadData = function(id){
    let url = '/api/teachers/' + id;
    $http.get(url).then(function(res) {
        self.leadInfo = res.data;
    });
  };

  self.getStudentsData = function(students){
    for (var i = 0; i < students.length; i++) {
      let url = '/api/users/' + students[i];
      $http.get(url).then(function(res) {
          self.studentsInfo.push(res.data);
      });
    }
  };

  let editTeam = function(id){

  }

  self.deleteTeam = function(id){
    console.log("delete!" + id);
    let url = '/api/project/team/' + id;
    $http.delete(url).then(function(res) {
      adminProjServ.updateDataAdmCourse();
    });
  }
}

adminTeamItemController.prototype.$onInit = function(){
  let self = this;
  self.lead = self.project.lead;
  self.students = self.project.students;
  self.courseId = self.project.students;
  self.getLeadData(self.lead);
  self.getStudentsData(self.students);
}

adminTeamItemController.$inject = ['$http', '$rootScope', '$scope', '$element', 'adminProjServ'];
module.exports = adminTeamItemController;
