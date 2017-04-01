require("../node_modules/materialize-css/dist/js/materialize");
require("../node_modules/materialize-css/dist/css/materialize.css");
require("../node_modules/material-design-icons/iconfont/material-icons.css");
require("./style.scss");



// Import angular and libs
const angular = require('angular');

// importing library to allow webpack put in into result bundle
const router = require('angular-ui-router');

// importing configuration function
const routerConfiguration = require('./app.config.router');
const AuthService = require('./services/AuthService');

// Create new angular application (module) with dependencies. This dependencies need to be registered in module.
const app = angular.module('mainApp', [
    // dependencies here
    'ui.router'
]);

AuthService(app);
// call configuration function and pass our angular application there
routerConfiguration(app);


const registerComponentsFunction = require('./components/index.js');
registerComponentsFunction(app);

// Handle manual change in address line
app.run(function($transitions) {

    $transitions.onStart({ to: 'student.*'}, function(trans) {
        var auth = trans.injector().get('AuthService');
        if (!auth.exists()) {
            // User isn't authenticated. Redirect to a new Target State
            return trans.router.stateService.target('login');
        } else {
            return auth.userRole().then(function (role) {
            switch (role) {
                    case 'admin':
                        return trans.router.stateService.target('admin.home');
                        break;
                    case 'teacher':
                        return trans.router.stateService.target('teacher');
                        break;
                };
            });

        }
    });
    $transitions.onStart({ to: 'teacher.*' }, function(trans) {
        var auth = trans.injector().get('AuthService');
        if (!auth.exists()) {
            // User isn't authenticated. Redirect to a new Target State
            return trans.router.stateService.target('login');
        } else {
            return auth.userRole().then(function (role) {
                switch (role) {
                    case 'admin':
                        return trans.router.stateService.target('admin.home');
                        break;
                    case 'student':
                        return trans.router.stateService.target('student');
                        break;
                };
            })
        }
    });
    $transitions.onStart({ to: 'admin.*' }, function(trans) {
        var auth = trans.injector().get('AuthService');
        if (!auth.exists()) {
            // User isn't authenticated. Redirect to a new Target State
            return trans.router.stateService.target('login');
        } else {
            return auth.userRole().then(function (role) {
                switch (role) {
                    case 'student':
                        return trans.router.stateService.target('student');
                        break;
                    case 'teacher':
                        return trans.router.stateService.target('teacher');
                        break;
                }
            });
        }
    });
});
