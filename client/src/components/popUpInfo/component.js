const popUpInfoController = require('./controller.js');

var popUpInfoComponent = {
	bindings: {
		message: '='
	},
	template: require('./template.html'),
	controller: popUpInfoController
};

module.exports = popUpInfoComponent;
