const UsersListController = require('./controller.js');

var personsListComponent = {
    bindings: {
        persons: '=?'
    },
    // We can set a templateUrl but then webpack will not load it into bundle
    // So we have to require template also
    // and setup a html-loader to correctly process html bundling

    // Will not bundled:
    //templateUrl: './states/studentList/template.html',

    // Will be bundled correctly:
    template: require('./template.html'),
    controller: UsersListController
};

module.exports = personsListComponent;