// We must require styles also to allow WEBPACK to pack this style file into bundle
// but we need apropriate loader - scss-loader and css-loader. Check webpack loaders configuration manual
require("./style.scss");

function UsersListController($http) {
    let self = this;

    $http.get('/api/users').then(function(res) {
        self.persons = res.data;
    });
}
// This is an angular special property. One of the way to safely inject smth to controller function
UsersListController.$inject = ['$http'];

module.exports = UsersListController;