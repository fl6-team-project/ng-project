app.controller( 'studentListCtrl', function myController($http) {
    let self = this;

    $http.get('./users.json').then(function (res) {
        self.users = res.data;
    });
});