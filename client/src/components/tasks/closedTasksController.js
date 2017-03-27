function closedTasksController($http, $rootScope, sharedService) {
  let self = this;
  let scope = $rootScope.$new();

  let getData = function(){
    $http.get('/api/tasks/closed').then(function(res) {
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
