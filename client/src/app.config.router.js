const studentListController = require("./states/studentList/controller.js");
const lecturesListController = require("./states/lecturesList/controller.js");
const homeController = require("./states/home/controller.js");

module.exports = function(app) {
  // We can register controller with angular first
  // Or use a controller as simple function
  app.controller('homeController', homeController);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
    // We can set a templateUrl but then webpack will not load it into bundle
    // So we have to require template also
    // and setup a html-loader to correctly process html bundling
      .state('students', {
      url: '/students',
      // Will not bundled:
      //templateUrl: './states/studentList/template.html',

      // Will be bundled correctly:
      template: require('./states/studentList/template.html'),
      // controller as simple function - pass a function itself
      controller: studentListController,
      controllerAs: '$ctrl'
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
