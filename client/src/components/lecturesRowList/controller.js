require('./style.scss');

function LecturesRowListController($http, $state, $timeout, AuthService) {
    let self = this;

    self.role = '';

    AuthService.userRole().then(function (userRole) {
        self.role = userRole;
    });

    $http.get('/api/lectures').then(function(res) {
        self.lectures = res.data;
    });

    $timeout(function () {
        $('.collapsible').collapsible({
            accordion : true
        });
    });

    self.runEdit = function (lecture) {
        $state.go(self.role + '.editLecture', {lecture: lecture });
    };
}


LecturesRowListController.$inject = ['$http', '$state', '$timeout', 'AuthService'];

module.exports = LecturesRowListController;
