function tasksSharedService($http, $rootScope) {
  let sharedService = {};
  sharedService.updateTasks = function() {
    $rootScope.$broadcast('updateData');
  }
  sharedService.changeStatus = function(task) {
    let data = task;
    data.status = (data.status == 'active') ? 'done' : 'active';
    self.error = false;
    let url = '/api/tasks/' + data._id;
    $http.put(url, data).then(function(res) {
        self.recenttasks = res.data;
        $rootScope.$broadcast('updateData');
      },
      function(err) {
        self.error = true;
      });
  }
  return sharedService;
}

tasksSharedService.$inject = ['$http', '$rootScope'];
module.exports = tasksSharedService;
