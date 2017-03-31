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
const ngFileUpload = require('ng-file-upload');

// Create new angular application (module) with dependencies. This dependencies need to be registered in module.
const app = angular.module('mainApp', [
    // dependencies here
    'ui.router',
    'ngFileUpload'
]);


// call configuration function and pass our angular application there
routerConfiguration(app);


const registerComponentsFunction = require('./components/index.js');
registerComponentsFunction(app);
