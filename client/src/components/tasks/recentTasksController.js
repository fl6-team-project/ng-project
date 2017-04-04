function recentTasksController($http, AuthService, sharedService, $rootScope) {
  let self = this;
  let scope = $rootScope.$new();
  let id = AuthService.getUser();

  let getData = function(){
    let url = '/api/tasks/recent/' + id;
    $http.get(url).then(function(res) {
      console.log(res.data);
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

recentTasksController.$inject = ['$http', 'AuthService', 'tasksSharedService', '$scope', '$rootScope'];
module.exports = recentTasksController;
