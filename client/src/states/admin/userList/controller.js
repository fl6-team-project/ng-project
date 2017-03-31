function UserListController($http) {
    let self = this;
    self.selectedRole = '';

    $http.get('/api/users/all').then(function(res) {
        self.persons = res.data;
    });

    self.userRoles = ['student', 'teacher', 'admin'];
}
// This is an angular special property. One of the way to safely inject smth to controller function
UserListController.$inject = ['$http'];

module.exports = UserListController;