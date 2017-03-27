
function formTasksController($http, $element, $scope, sharedService, $rootScope) {
  let self = this;

  self.addTask = function() {
    if (self.text == '' | self.text == undefined) {
    } else {
      let data = {
        text: self.text,
        status: 'active'
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

formTasksController.$inject = ['$http', '$element', '$scope', 'tasksSharedService'];
module.exports = formTasksController;
