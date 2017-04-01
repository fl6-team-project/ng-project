function closedTasksController($http, AuthService, sharedService, $rootScope) {
    let self = this;
    let scope = $rootScope.$new();
    let id = AuthService.getUser();

  let getData = function(){
    let url = '/api/tasks/closed/' + id;
    $http.get(url).then(function(res) {
      self.tasks = res.data;
    });
  };

  scope.$on('updateData', function(event) {
      getData();
  });

  getData();

  self.changeStatus = function(task) {
    sharedService.changeStatus(task);
  }
}

closedTasksController.$inject = ['$http', 'AuthService', 'tasksSharedService', '$scope', '$rootScope'];
module.exports = closedTasksController;
