require("./style.scss");

function TeacherListController($http) {
    let self = this;

    $http.get('/api/teachers').then(function(res) {
        self.persons = res.data;
    });
}
TeacherListController.$inject = ['$http'];

module.exports = TeacherListController;