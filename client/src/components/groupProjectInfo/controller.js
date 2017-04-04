function groupProjectInfoController(AuthService, $http) {
  let self = this;
  self.role = '';
  AuthService.userRole().then(function(userRole) {
    self.role = userRole;
  });

  self.editMess = {
    'title': 'Error',
    'message': "Sorry, smth wrong. Try later!",
    "btn": "Ok"
  };

  self.saveTeamDesc = function(id) {
    let data = {};
    data.name = self.project.name;
    data.technologies = self.project.technologies;
    data.description = self.project.description;
    let url = '/api/course/projects/' + id;
    $http.put(url, data).then(function(res) {
        self.editMess = {
          'title': 'Success',
          'message': 'Project info change!',
          "btn": "Cool!"
        };
        jQuery('.modal').modal();
        jQuery('.modal').modal('open');
      },
      function(err) {
        self.error = true;
        jQuery('.modal').modal();
        jQuery('.modal').modal('open');
      });
  }
}

groupProjectInfoController.$inject = ['AuthService', '$http'];
module.exports = groupProjectInfoController;
