module.exports = function(app) {

app.service('AuthService', ['$q', '$http', '$state', function AuthService($q, $http, $state) {
    localStorage.setItem('userAuthorized', null);
    var deferred = $q.defer();

    return {
        getUser: function () {
            return JSON.parse(localStorage.getItem('userAuthorized'));
        },
        exists: function () {
            return JSON.parse(localStorage.getItem('userAuthorized')) != null;
        },
        login: function (userData) {
            $http.post('/api/login', userData,
                {headers: {
                    'x-requested-with': 'XMLHttpRequest'
                }
                }
            ).then(function (user) {
                if (user) {
                    localStorage.setItem('userAuthorized', JSON.stringify(user));
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
            return this.exists() ? JSON.parse(localStorage.getItem('userAuthorized')).role : 'guest';
        }
    }
}])


};