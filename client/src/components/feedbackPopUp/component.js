const feedbackPopUpController = require("./controller.js");

const feedbackPopUpComponent = {
  bindings: {
    lecture: '='
  },
  template: require('./template.html'),
  controller: fedbackPopUpController,
  controllerAs: 'feedbackPopUp'
};

module.exports = feedbackPopUpComponent;
