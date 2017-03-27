function registerController($http, $state) {
    let self = this;
    self.regErrorMessage = false;
    self.username = '';
    self.password = '';
    self.user = '';

    self.registerUser = function () {
        var data = {
            username: self.username,
            password: self.password,
            firstName: self.firstName,
            lastName: self.lastName,
            email: self.email
        };
        console.log(data);
        console.log('test');

        $http.post('/api/register', data,
            {headers: {
            'x-requested-with': 'XMLHttpRequest'
                }
            }
        ).then(function (res) {
            self.user = res.data;
            console.log(self.user);
            $state.go('student');
        }, function (err) {
            self.regErrorMessage = true;
        });
    }
}

registerController.$inject = ['$http', '$state'];

module.exports = registerController;
