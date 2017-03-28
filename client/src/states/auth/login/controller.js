function loginController($http, $state, AuthService) {
    let self = this;
    self.loginErrorMessage = false;
    self.username = '';
    self.password = '';
    self.user = null;

    self.logIn = function () {
        var data = {
        username: self.username,
        password: self.password
    };
        AuthService.login(data).then(function (res) {
            self.user = res.data;
            $state.go('student');
        }, function (err) {
            self.loginErrorMessage = true;
        });
    }
}

loginController.$inject = ['$http', '$state', 'AuthService'];

module.exports = loginController;
