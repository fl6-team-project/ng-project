app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('students', {
            url: '/students',
            templateUrl: './templates/userList.template.html',
            controller: 'studentListCtrl',
            controllerAs: 'studentList'
        })
        .state('home', {
            url: '/',
            templateUrl: './templates/home.template.html',
            controller: 'HomeController'
        });

    $urlRouterProvider.otherwise('/');
}]);
