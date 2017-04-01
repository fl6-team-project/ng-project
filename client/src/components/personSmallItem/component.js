const UsersListSmallController = require('./controller.js');

var personsSmallItemComponent = {
	bindings: {
		person: '='
	},
	template: require('./template.html'),
	controller: UsersListSmallController
};

module.exports = personsSmallItemComponent;
