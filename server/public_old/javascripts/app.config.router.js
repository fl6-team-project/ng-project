app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('students', {
            url: '/students',
            parent: 'home',
            //Need to set proper templates & controllers
            templateUrl: './templates/userList.template.html',
            controller: 'studentListCtrl',
            controllerAs: 'studentList'
        })
        .state('students.list', {
            url: '/list',
            parent: 'students',
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
