function UsersListController($http) {
  let self = this;

  $http.get('/api/users').then(function(res) {
    self.persons = res.data;
  });
}
UsersListController.$inject = ['$http'];

module.exports = UsersListController;