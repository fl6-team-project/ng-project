function closedTasksController($http, $rootScope, sharedService) {
  let self = this;
  let scope = $rootScope.$new();
  let id = AuthService.getUser();

  let getData = function(){
    let url = '/api/tasks/closed/' + id;
    $http.get(url).then(function(res) {
      self.tasks = res.data;
    });
  }

  scope.$on('updateData', function(event) {
      getData();
  });

  getData();

  self.changeStatus = function(task) {
    sharedService.changeStatus(task);
  }
}

closedTasksController.$inject = ['$http', '$rootScope', 'tasksSharedService'];
module.exports = closedTasksController;
