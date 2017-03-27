const fedbackPopUpController = require("./controller.js");

const fedbackPopUpComponent = {
  bindings: {
    lecture: '='
  },
  template: require('./template.html'),
  controller: fedbackPopUpController,
  controllerAs: 'fedbackPopUp'
};

module.exports = fedbackPopUpComponent;
