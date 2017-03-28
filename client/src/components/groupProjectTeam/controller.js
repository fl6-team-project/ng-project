function groupProjectTeamController($http, $scope, $rootScope) {
  let scope = $rootScope.$new();
  let self = this;
  self.students = [];

  scope.$on('getProject', function(event, data) {
    self.project = data;
    getLeadData(self.project.lead);
    getStudentsData(self.project.students);
  });

  let getLeadData = function(id){
    let url = '/api/teachers/' + id;
    $http.get(url).then(function(res) {
        self.lead = res.data;
    });
  }

  let getStudentsData = function(students){
    let url ='';
    for (var i = 0; i < students.length; i++) {
      let url = '/api/users/' + students[i];
      $http.get(url).then(function(res) {
          self.students.push(res.data);
      });
    }
  }
}

groupProjectTeamController.$inject = ['$http', '$scope', '$rootScope'];
module.exports = groupProjectTeamController;
