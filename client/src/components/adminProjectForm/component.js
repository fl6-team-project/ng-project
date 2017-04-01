const adminProjectFormController = require("./controller.js");

const adminProjectFormComponent = {
  bindings: {
    projectitem: '=',
    create: '='
  },
  template: require('./template.html'),
  controller: adminProjectFormController
};

module.exports = adminProjectFormComponent;
