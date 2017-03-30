function groupProjectInfoController($http, $scope, $rootScope) {
  let scope = $rootScope.$new();
  let self = this;

  scope.$on('getProject', function(event, data) {
    self.project = data;
  });
}

groupProjectInfoController.$inject = ['$http', '$scope', '$rootScope'];
module.exports = groupProjectInfoController;
