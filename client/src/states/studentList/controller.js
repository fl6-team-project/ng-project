// We must require styles also to allow WEBPACK to pack this style file into bundle
// but we need apropriate loader - scss-loader and css-loader. Check webpack loaders configuration manual
require("./style.scss");

function studentsListController($http) {
    let self = this;

    $http.get('./users.json').then(function (res) {
        self.users = res.data;
    });
}

// This is an angular special property. One of the way to safely inject smth to controller function
studentsListController.$inject = ['$http'];

module.exports = studentsListController;
