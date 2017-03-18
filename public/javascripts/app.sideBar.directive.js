app.directive('sideBar', function () {
    return {
        templateUrl: './templates/sideNav.template.html',
        restrict: 'EA',
        controller: 'myProfile',
        controllerAs: 'profile',
        scope: true
    }
});