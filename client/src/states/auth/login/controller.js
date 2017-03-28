function loginController($http, $state) {
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
        $http.post('/api/login', data,
            {headers: {
                'x-requested-with': 'XMLHttpRequest'
                }
            }
        ).then(function (res) {
            self.user = res.data;
            $state.go('student');
        }, function (err) {
            self.loginErrorMessage = true;
        });
    }
}

loginController.$inject = ['$http', '$state'];

module.exports = loginController;
