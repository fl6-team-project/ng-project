const lecturesListController = require("./states/lecturesList/controller.js");
const homeController = require("./states/home/controller.js");
const personsListComponent = require('./components/personsList/personsListComponent.js');

module.exports = function(app) {
  // We can register controller with angular first
  // Or use a controller as simple function
  app.controller('homeController', homeController);
  // We need to register component
  app.component('personsListComponent', personsListComponent);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // students state using component method
    // now the controller and template included in component
    // and you should include here only component
    .state('students', {
      url: '/students',
      component: 'personsListComponent'
    })

    .state('lectures', {
      url: '/lectures',
      template: require('./states/lecturesList/template.html'),
      controller: lecturesListController,
      controllerAs: '$ctrl'
    })

    .state('home', {
      url: '/',
      template: require('./states/home/template.html'),
      // controller as string - name of previously registered controller
      controller: 'homeController',
      controllerAs: '$ctrl'
    })

    $urlRouterProvider.otherwise('/');
  }]);

}
