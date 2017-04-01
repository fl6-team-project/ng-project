
function formTasksController($http, AuthService, sharedService) {
  let self = this;

  self.addTask = function() {

    if (self.text == '' | self.text == undefined) {
    } else {
      let data = {
        text: self.text,
        status: 'active',
        studentId: AuthService.getUser()
      };
      let url = '/api/tasks';
      $http.post(url, data).then(function(res) {
          self.recenttasks = res.data;
          sharedService.updateTasks();
        },
        function(err) {
          self.error = true;
        });
      self.text = '';
    }
  }

}

formTasksController.$inject = ['$http', 'AuthService', 'tasksSharedService'];
module.exports = formTasksController;
