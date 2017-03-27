function recentTasksController($http, sharedService, $rootScope) {
  let self = this;
  let scope = $rootScope.$new();

  let getData = function(){
    $http.get('/api/tasks/recent').then(function(res) {
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

recentTasksController.$inject = ['$http', 'tasksSharedService', '$scope', '$rootScope'];
module.exports = recentTasksController;
