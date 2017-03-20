app.controller( 'myProfile', function myController($http) {
    let self = this;

    $http.get('./users.json').then(function (res) {
        self.user = res.data[0];
    });
});