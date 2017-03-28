function loginController($http, $state, AuthService) {
    let self = this;
    self.loginErrorMessage = false;
    self.username = '';
    self.password = '';
    self.user = '';

    self.logIn = function () {
        var data = {
        username: self.username,
        password: self.password
    };
        AuthService.login(data).then(function (res) {
            user = res.data;
            $state.go('student');
        });
    }
}

loginController.$inject = ['$http', '$state', 'AuthService'];

module.exports = loginController;
