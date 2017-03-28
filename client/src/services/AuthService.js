module.exports = function(app) {

app.service('AuthService', function AuthService($q, $http) {
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
        },
        userRole: function () {
            return this.exists() ? authorized.role : 'guest';
        }
    }
})


};