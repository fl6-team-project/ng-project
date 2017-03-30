function TeacherListController($http, $state, AuthService) {
    this.logout = function() {
        AuthService.logout();
        $state.go('login');
    }
}

TeacherListController.$inject = ['$http', '$state', 'AuthService'];
module.exports = TeacherListController;