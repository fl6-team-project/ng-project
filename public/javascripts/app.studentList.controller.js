app.controller( 'studentListCtrl', function myController($http) {
    let self = this;

    $http.get('/api/users').then(function (res) {
        self.users = res.data;
    });
});