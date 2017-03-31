module.exports = function(app) {

app.service('AuthService', function AuthService($q, $http) {
    localStorage.setItem('userAuthorized', null);
    var deferred = $q.defer();

    return {
        getUser: function () {
            return JSON.parse(localStorage.getItem('userAuthorized'));
        },
        exists: function () {
            return JSON.parse(localStorage.getItem('userAuthorized')) !== null;
        },
        login: function (userData) {
            $http.post('/api/login', userData,
                {headers: {
                    'x-requested-with': 'XMLHttpRequest'
                }
                }
            ).then(function (user) {
                if (user) {
                    localStorage.setItem('userAuthorized', JSON.stringify(user.data.id));
                    deferred.resolve(user);
                } else {
                    deferred.reject('Wrong username or password');
                }
            }, function (err) {
                deferred.reject('Error');
            });
            return deferred.promise;
        },
        logout: function () {
            localStorage.setItem('userAuthorized', null);
            $http.post('/api/logout');
        },
        userRole: function () {
            if (this.exists()) {
                let id = JSON.parse(localStorage.getItem('userAuthorized'));
                let user = '';
                return $http.get('/api/users/' + id).then(function (res) {
                    user = res.data;
                    return user.userRole;
                });
            } else {
                return 'guest';
            }
        }
    }
})


};