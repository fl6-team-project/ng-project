const adminTeamItemController = require("./controller.js");

const adminTeamItemComponent = {
  bindings: {
		project: '='
	},
  template: require('./template.html'),
  controller: adminTeamItemController
};

module.exports = adminTeamItemComponent;
