function StudentController($http, $state, AuthService) {
    let self = this;
    self.userInfo = AuthService.getUser().data;
    let id = self.userInfo.id;
    let url = '/api/users/' + id;
    $http.get(url).then(function(res) {
        self.user = res.data;
    });
    self.logout = function() {
        AuthService.logout();
        $state.go('login');

    };
}

StudentController.$inject = ['$http', '$state', 'AuthService'];
module.exports = StudentController;