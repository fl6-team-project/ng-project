function adminTeamItemController($http, $rootScope, $scope, $element, adminProjServ) {
  let scope = $rootScope.$new();
  let self = this;
  self.studentsInfo = [];
  self.teamForm = false;
  self.create = false;
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

  // self.editTeam = function(id){
  //   self.projectitem = self.project;
  //   self.teamForm = true;
  // }

  self.deleteTeam = function(project){
    let updProj = {
      groupProjectId: ''
    };
    let url = '/api/project/users/' + project.lead;
    adminProjServ.updatePersons(url, updProj);
    let studProjArr = project.students;
    for (var i = 0; i < studProjArr.length; i++) {
      url = '/api/project/users/' + studProjArr[i];
      adminProjServ.updatePersons(url, updProj);
    }
    url = '/api/project/team/' + project._id;
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
