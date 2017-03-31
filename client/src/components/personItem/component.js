const UsersListController = require('./controller.js');

var personsItemComponent = {
	bindings: {
		person: '='
	},
	template: require('./template.html'),
	controller: UsersListController
};

module.exports = personsItemComponent;
