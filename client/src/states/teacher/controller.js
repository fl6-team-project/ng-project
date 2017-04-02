function TeacherController($http, $state, AuthService) {
    let self = this;
    if (AuthService.exists()) {
        let id = AuthService.getUser();
        let url = '/api/users/' + id;
        $http.get(url).then(function (res) {
            self.user = res.data;
        });

    } else {
        $state.go('login');
    }

    self.logout = function () {
        AuthService.logout();
        $state.go('login');

    };
}

TeacherController.$inject = ['$http', '$state', 'AuthService'];
module.exports = TeacherController;