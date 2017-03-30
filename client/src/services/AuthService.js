module.exports = function(app) {

app.service('AuthService', ['$q', '$http', '$state', function AuthService($q, $http, $state) {
    var authorized = null;
    var deferred = $q.defer();
    return {
        getUser: function () {
            return authorized;
        },
        exists: function () {
            return authorized != null;
        },
        login: function (userData) {
            $http.post('/api/login', userData,
                {headers: {
                    'x-requested-with': 'XMLHttpRequest'
                }
                }
            ).then(function (user) {
                if (user) {
                    authorized = user;
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
            authorized = null;
            $http.post('/api/logout');
            $state.go('/');

        },
        userRole: function () {
            return this.exists() ? authorized.role : 'guest';
        }
    }
}])


};